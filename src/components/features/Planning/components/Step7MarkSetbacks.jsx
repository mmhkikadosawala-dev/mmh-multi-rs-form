
import {
  Box,
  Flex,
  Text,
  Input,
  useBreakpointValue,
  Button,
  Heading,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Step7MarkSetbacks({
  formData,
  setFormData,
  onNext,
  onSubmit,
  onBack,
  isLastStep,
}) {
  const containerMinHeight = useBreakpointValue({ base: "500px", md: "600px" });
  const imageBoxSize = useBreakpointValue({ base: "200px", md: "240px" });

  const svgRef = useRef(null);
  const scaleRef = useRef({ shiftX: 0, shiftY: 0, finalScale: 1 });
  const [modelPoints, setModelPoints] = useState(null);
  const [bounding, setBounding] = useState(null);
  const [buildingPoints, setBuildingPoints] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [dragPointIndex, setDragPointIndex] = useState(-1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [gapInputs, setGapInputs] = useState(Array(8).fill(""));

  // Point in polygon helper
  const pointInPolygon = useCallback((point, vs) => {
    const x = point.x;
    const y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i].x;
      const yi = vs[i].y;
      const xj = vs[j].x;
      const yj = vs[j].y;
      const intersect = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }, []);

  // Check if point is within plot boundary
  const isPointValid = useCallback(
    (point) => {
      if (!modelPoints) return false;
      return pointInPolygon(point, [modelPoints.tl, modelPoints.tr, modelPoints.br, modelPoints.bl]);
    },
    [modelPoints, pointInPolygon]
  );

  // Calculate model points for outer plot
  useEffect(() => {
    const fw =
      formData.shape === "rectangular"
        ? parseFloat(formData.size?.width) || 30
        : parseFloat(formData.size?.front) || 30;
    const bw =
      formData.shape === "rectangular"
        ? parseFloat(formData.size?.width) || 30
        : parseFloat(formData.size?.back) || 30;
    const ld =
      formData.shape === "rectangular"
        ? parseFloat(formData.size?.depth) || 30
        : parseFloat(formData.size?.left) || 30;
    const rd =
      formData.shape === "rectangular"
        ? parseFloat(formData.size?.depth) || 30
        : parseFloat(formData.size?.right) || 30;

    if (fw <= 0 || bw <= 0 || ld <= 0 || rd <= 0) {
      setModelPoints(null);
      setBounding(null);
      return;
    }

    const diff = bw - fw;
    let a, h;
    if (Math.abs(diff) < 0.01) {
      if (Math.abs(ld - rd) > 0.01) {
        setModelPoints(null);
        setBounding(null);
        return;
      }
      a = 0;
      h = ld;
    } else {
      a = (rd ** 2 - ld ** 2 - diff ** 2) / (2 * diff);
      const h2 = ld ** 2 - a ** 2;
      if (h2 <= 0) {
        setModelPoints(null);
        setBounding(null);
        return;
      }
      h = Math.sqrt(h2);
    }

    const points = {
      tl: { x: a, y: 0 },
      tr: { x: a + bw, y: 0 },
      bl: { x: 0, y: h },
      br: { x: fw, y: h },
    };

    const minX = Math.min(points.tl.x, points.tr.x, points.bl.x, points.br.x);
    const minY = Math.min(points.tl.y, points.tr.y, points.bl.y, points.br.y);
    const maxX = Math.max(points.tl.x, points.tr.x, points.bl.x, points.br.x);
    const maxY = Math.max(points.tl.y, points.tr.y, points.bl.y, points.br.y);

    setBounding({ minX, minY, maxX, maxY });
    setModelPoints(points);
  }, [formData.shape, formData.size]);

  // Initialize building area as centered square when plot data changes
  useEffect(() => {
    if (!bounding) return;

    const totalW = bounding.maxX - bounding.minX;
    const totalH = bounding.maxY - bounding.minY;
    const setback = 3;
    const centerX = (bounding.minX + bounding.maxX) / 2;
    const centerY = (bounding.minY + bounding.maxY) / 2;
    const availableW = totalW - (setback * 2);
    const availableH = totalH - (setback * 2);
    const size = Math.min(availableW, availableH) * 0.98; // Increased to 98% for prominence
    const half = size / 2;

    const initialSquare = [
      { x: centerX - half, y: centerY - half },
      { x: centerX + half, y: centerY - half },
      { x: centerX + half, y: centerY + half },
      { x: centerX - half, y: centerY + half },
    ];

    if (initialSquare.every((p) => isPointValid(p))) {
      setBuildingPoints(initialSquare);
      setGapInputs(Array(8).fill(""));
    } else {
      const fallbackSize = Math.min(availableW, availableH) * 0.85;
      const fallbackHalf = fallbackSize / 2;
      const fallbackSquare = [
        { x: centerX - fallbackHalf, y: centerY - fallbackHalf },
        { x: centerX + fallbackHalf, y: centerY - fallbackHalf },
        { x: centerX + fallbackHalf, y: centerY + fallbackHalf },
        { x: centerX - fallbackHalf, y: centerY + fallbackHalf },
      ];
      setBuildingPoints(fallbackSquare);
      setGapInputs(Array(8).fill(""));
    }
  }, [bounding, isPointValid]);

  // Convert screen coordinates to model space
  const getModelFromMouse = useCallback((e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const { shiftX, shiftY, finalScale } = scaleRef.current;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    return {
      x: (mouseX - shiftX) / finalScale,
      y: (mouseY - shiftY) / finalScale,
    };
  }, []);

  const getModelFromTouch = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const { shiftX, shiftY, finalScale } = scaleRef.current;
    const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
    if (!t) return { x: 0, y: 0 };
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    return {
      x: (x - shiftX) / finalScale,
      y: (y - shiftY) / finalScale,
    };
  };

  // Start dragging a specific point
  const handlePointStart = useCallback(
    (pointIndex, e, isTouch = false) => {
      if (isTouch) e.preventDefault();
      e.stopPropagation();

      const p = isTouch ? getModelFromTouch(e) : getModelFromMouse(e);
      setDragOffset({
        x: p.x - buildingPoints[pointIndex].x,
        y: p.y - buildingPoints[pointIndex].y,
      });

      setDragPointIndex(pointIndex);
      setDragging(true);
      setIsInteracting(true);
    },
    [getModelFromMouse, getModelFromTouch, buildingPoints]
  );

  // Handle point dragging
  const handlePointMove = useCallback(
    (e, isTouch = false) => {
      if (!dragging || dragPointIndex === -1 || !bounding) return;
      if (isTouch) e.preventDefault();

      const p = isTouch ? getModelFromTouch(e) : getModelFromMouse(e);
      const newX = p.x - dragOffset.x;
      const newY = p.y - dragOffset.y;
      const newPoint = { x: newX, y: newY };

      if (isPointValid(newPoint)) {
        const newPoints = [...buildingPoints];
        newPoints[dragPointIndex] = newPoint;
        setBuildingPoints(newPoints);
        setGapInputs(Array(8).fill(""));
      }
    },
    [dragging, dragPointIndex, bounding, getModelFromMouse, getModelFromTouch, dragOffset, buildingPoints, isPointValid]
  );

  // Finish interaction
  const handleEnd = useCallback(() => {
    setDragging(false);
    setDragPointIndex(-1);
    setDragOffset({ x: 0, y: 0 });
    setIsInteracting(false);

    if (buildingPoints.length > 0) {
      setFormData((prev) => ({
        ...prev,
        buildingArea: buildingPoints.map((p) => ({
          x: Math.round(p.x * 10) / 10,
          y: Math.round(p.y * 10) / 10,
        })),
      }));
    }
  }, [buildingPoints, setFormData]);

  // Global event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (dragging) handlePointMove(e);
    };
    const handleGlobalMouseUp = () => handleEnd();

    const handleGlobalTouchMove = (e) => {
      if (dragging) handlePointMove(e, true);
    };
    const handleGlobalTouchEnd = () => handleEnd();

    if (dragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
      document.addEventListener("touchend", handleGlobalTouchEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [dragging, handlePointMove, handleEnd]);

  // Distance from point to segment
  const distPointToSegment = (p, a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (dx === 0 && dy === 0) {
      return { dist: Math.hypot(p.x - a.x, p.y - a.y), closest: a };
    }
    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t));
    const proj = {
      x: a.x + t * dx,
      y: a.y + t * dy,
    };
    return { dist: Math.hypot(p.x - proj.x, p.y - proj.y), closest: proj };
  };

  // Calculate gaps at 8 positions (4 corners + 4 midpoints)
  const calculateGaps = useCallback(() => {
    if (!modelPoints || buildingPoints.length === 0) return [];

    const plotSegments = [
      [modelPoints.tl, modelPoints.tr], // top
      [modelPoints.tr, modelPoints.br], // right
      [modelPoints.br, modelPoints.bl], // bottom
      [modelPoints.bl, modelPoints.tl], // left
    ];

    const points = buildingPoints; // 0: tl, 1: tr, 2: br, 3: bl

    const mids = [
      { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }, // mid-top
      { x: (points[1].x + points[2].x) / 2, y: (points[1].y + points[2].y) / 2 }, // mid-right
      { x: (points[2].x + points[3].x) / 2, y: (points[2].y + points[3].y) / 2 }, // mid-bottom
      { x: (points[3].x + points[0].x) / 2, y: (points[3].y + points[0].y) / 2 }, // mid-left
    ];

    const gapPoints = [
      { point: points[0], label: "1 (Top-Left)", index: 0 },
      { point: mids[3], label: "8 (Mid-Left)", index: 8 },
      { point: points[3], label: "4 (Bottom-Left)", index: 3 },
      { point: mids[2], label: "7 (Mid-Bottom)", index: 7 },
      { point: points[2], label: "3 (Bottom-Right)", index: 2 },
      { point: mids[1], label: "6 (Mid-Right)", index: 6 },
      { point: points[1], label: "2 (Top-Right)", index: 1 },
      { point: mids[0], label: "5 (Mid-Top)", index: 5 },
    ];

    const gaps = gapPoints.map(({ point, label, index }) => {
      const results = plotSegments.map((s) => distPointToSegment(point, s[0], s[1]));
      const minResult = results.reduce((min, curr) => (curr.dist < min.dist ? curr : min), results[0]);
      return {
        label,
        gap: Math.max(0, Math.round(minResult.dist * 10) / 10),
        closestPoint: minResult.closest,
        point,
        index,
      };
    });

    return gaps;
  }, [modelPoints, buildingPoints]);

  // Handle gap input changes
  const handleGapInputChange = useCallback(
    (index, value) => {
      if (!modelPoints || !buildingPoints.length) return;

      const newGapInputs = [...gapInputs];
      newGapInputs[index] = value;
      setGapInputs(newGapInputs);

      const gapValue = parseFloat(value);
      if (isNaN(gapValue) || gapValue < 0) return;

      const plotSegments = [
        [modelPoints.tl, modelPoints.tr], // top
        [modelPoints.tr, modelPoints.br], // right
        [modelPoints.br, modelPoints.bl], // bottom
        [modelPoints.bl, modelPoints.tl], // left
      ];

      const newPoints = [...buildingPoints];

      if (index < 4) {
        const pointIndex = [0, 1, 2, 3][index];
        const currentPoint = buildingPoints[pointIndex];
        const results = plotSegments.map((s) => distPointToSegment(currentPoint, s[0], s[1]));
        const minResult = results.reduce((min, curr) => (curr.dist < min.dist ? curr : min), results[0]);
        const closest = minResult.closest;
        const dx = currentPoint.x - closest.x;
        const dy = currentPoint.y - closest.y;
        const currentDist = Math.hypot(dx, dy);
        if (currentDist === 0) return;

        const scale = gapValue / currentDist;
        const newX = closest.x + dx * scale;
        const newY = closest.y + dy * scale;

        if (isPointValid({ x: newX, y: newY })) {
          newPoints[pointIndex] = { x: newX, y: newY };
          setBuildingPoints(newPoints);
        }
      } else {
        const midIndex = index - 4;
        const pointIndices = [
          [0, 1], // mid-top
          [1, 2], // mid-right
          [2, 3], // mid-bottom
          [3, 0], // mid-left
        ][midIndex];
        const p1 = buildingPoints[pointIndices[0]];
        const p2 = buildingPoints[pointIndices[1]];
        const midPoint = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
        };

        const results = plotSegments.map((s) => distPointToSegment(midPoint, s[0], s[1]));
        const minResult = results.reduce((min, curr) => (curr.dist < min.dist ? curr : min), results[0]);
        const closest = minResult.closest;
        const dx = midPoint.x - closest.x;
        const dy = midPoint.y - closest.y;
        const currentDist = Math.hypot(dx, dy);
        if (currentDist === 0) return;

        const scale = gapValue / currentDist;
        const deltaX = dx * (scale - 1);
        const deltaY = dy * (scale - 1);

        const newP1 = { x: p1.x + deltaX, y: p1.y + deltaY };
        const newP2 = { x: p2.x + deltaX, y: p2.y + deltaY };

        if (isPointValid(newP1) && isPointValid(newP2)) {
          newPoints[pointIndices[0]] = newP1;
          newPoints[pointIndices[1]] = newP2;
          setBuildingPoints(newPoints);
        }
      }
    },
    [gapInputs, modelPoints, buildingPoints, isPointValid]
  );

  const currentGaps = calculateGaps();

  const renderDiagram = () => {
    if (!modelPoints || !bounding || buildingPoints.length === 0) {
      return (
        <Text textAlign="center" color="red.500">
          Loading plot...
        </Text>
      );
    }

    const viewW = 350;
    const viewH = 280;
    const boundingW = bounding.maxX - bounding.minX;
    const boundingH = bounding.maxY - bounding.minY;
    const finalScale = Math.min(viewW / boundingW, viewH / boundingH) * 0.8;
    const shiftX = (viewW - boundingW * finalScale) / 2 - bounding.minX * finalScale;
    const shiftY = (viewH - boundingH * finalScale) / 2 - bounding.minY * finalScale;

    scaleRef.current = { finalScale, shiftX, shiftY };

    const toScreen = (p) => ({
      x: p.x * finalScale + shiftX,
      y: p.y * finalScale + shiftY,
    });

    const screenPlotPoints = {
      tl: toScreen(modelPoints.tl),
      tr: toScreen(modelPoints.tr),
      bl: toScreen(modelPoints.bl),
      br: toScreen(modelPoints.br),
    };

    const screenBuildingPoints = buildingPoints.map(toScreen);
    const handleRadius = 8;

    return (
      <svg
        ref={svgRef}
        width={viewW}
        height={viewH}
        style={{ touchAction: "none", border: "1px solid #e2e8f0", borderRadius: "8px" }}
        onTouchStart={(e) => e.preventDefault()}
      >
        {/* Outer plot polygon */}
        <polygon
          points={`${screenPlotPoints.tl.x},${screenPlotPoints.tl.y} ${screenPlotPoints.tr.x},${screenPlotPoints.tr.y} ${screenPlotPoints.br.x},${screenPlotPoints.br.y} ${screenPlotPoints.bl.x},${screenPlotPoints.bl.y}`}
          fill="rgba(229, 231, 235, 0.4)"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Plot boundary label */}
        <text
          x={viewW / 2}
          y={25}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#64748b"
        >
          Plot Boundary
        </text>

        {/* Gap lines from building points to plot boundary */}
        {currentGaps.map((gap, index) => {
          const p1 = toScreen(gap.point);
          const p2 = toScreen(gap.closestPoint);
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          return (
            <g key={`gap-line-${index}`}>
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#a0aec0"
                strokeWidth="1.5" // Slightly thicker for prominence
                strokeDasharray="4,4"
                opacity="0.8"
              />
              <text
                x={midX}
                y={midY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10" // Larger font for readability
                fill="#4a5568"
                fillOpacity="0.9"
                pointerEvents="none"
              >
                {gap.gap} ft
              </text>
            </g>
          );
        })}

        {/* Building area polygon */}
        {screenBuildingPoints.length > 2 && (
          <polygon
            points={screenBuildingPoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="rgba(59, 130, 246, 0.4)" // Slightly more opaque for emphasis
            stroke="#3b82f6"
            strokeWidth="2.5" // Thicker stroke for visibility
          />
        )}

        {/* Building area center label */}
        {screenBuildingPoints.length > 2 && (
          <text
            x={screenBuildingPoints.reduce((sum, p) => sum + p.x, 0) / screenBuildingPoints.length}
            y={screenBuildingPoints.reduce((sum, p) => sum + p.y, 0) / screenBuildingPoints.length}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14" // Larger font for prominence
            fontWeight="600"
            fill="#1e40af"
            pointerEvents="none"
          >
            Building Area
          </text>
        )}

        {/* Draggable corner points */}
        {screenBuildingPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={handleRadius}
            fill="white"
            stroke="#3b82f6"
            strokeWidth="3"
            style={{ cursor: "grab" }}
            onMouseDown={(e) => handlePointStart(index, e)}
            onTouchStart={(e) => handlePointStart(index, e, true)}
          />
        ))}

        {/* Corner point labels */}
        {screenBuildingPoints.map((point, index) => (
          <text
            key={`label-${index}`}
            x={point.x}
            y={point.y - 15}
            textAnchor="middle"
            fontSize="12" // Larger font for clarity
            fontWeight="500"
            fill="#3b82f6"
            pointerEvents="none"
          >
            {index + 1}
          </text>
        ))}
      </svg>
    );
  };

  // Reset to square function
  const resetToSquare = () => {
    if (!bounding) return;

    const totalW = bounding.maxX - bounding.minX;
    const totalH = bounding.maxY - bounding.minY;
    const setback = 3;
    const centerX = (bounding.minX + bounding.maxX) / 2;
    const centerY = (bounding.minY + bounding.maxY) / 2;
    const availableW = totalW - (setback * 2);
    const availableH = totalH - (setback * 2);
    const size = Math.min(availableW, availableH) * 0.98; // Increased to 98%
    const half = size / 2;

    const square = [
      { x: centerX - half, y: centerY - half },
      { x: centerX + half, y: centerY - half },
      { x: centerX + half, y: centerY + half },
      { x: centerX - half, y: centerY + half },
    ];

    if (square.every((p) => isPointValid(p))) {
      setBuildingPoints(square);
      setGapInputs(Array(8).fill(""));
    } else {
      const fallbackSize = Math.min(availableW, availableH) * 0.85;
      const fallbackHalf = fallbackSize / 2;
      const fallbackSquare = [
        { x: centerX - fallbackHalf, y: centerY - fallbackHalf },
        { x: centerX + fallbackHalf, y: centerY - fallbackHalf },
        { x: centerX + fallbackHalf, y: centerY + fallbackHalf },
        { x: centerX - fallbackHalf, y: centerY + fallbackHalf },
      ];
      setBuildingPoints(fallbackSquare);
      setGapInputs(Array(8).fill(""));
    }
  };

  const handleAction = isLastStep ? onSubmit : onNext;

  return (
    <Box
      minHeight={containerMinHeight}
      px={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex align="center" mb={4}>
        <Heading size="sm" color="teal.600">Define Building Area</Heading>
      </Flex>

      <Text fontSize="sm" color="gray.600" mb={4} textAlign="center">
        Drag the numbered corner points or enter gap values below to customize your building area shape within the plot boundary. Dashed lines show the shortest distance to the plot boundary.
      </Text>

      <Box height="280px" mb={6} mx="auto" maxWidth="350px" position="relative">
        {renderDiagram()}
      </Box>

      <VStack spacing={4}>
        <Text fontSize="xs" color="blue.600" textAlign="center" fontWeight="500">
          🖱️ Drag corner points (1,2,3,4) or use inputs below to set gaps
        </Text>

        <Button onClick={resetToSquare} size="sm" variant="outline" colorScheme="blue">
          Reset to Square
        </Button>

        {/* Display calculated gaps and input fields */}
        <Box bg="gray.50" p={3} borderRadius="md" w="100%">
          <Text fontSize="xs" color="gray.600" mb={2} fontWeight="600">
            Setback Gaps at Key Positions:
          </Text>
          <VStack align="start" spacing={3} fontSize="xs" color="gray.700">
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} w="100%">
              {currentGaps.map((g, index) => (
                <FormControl key={g.label} isDisabled={isInteracting}>
                  <FormLabel fontSize="xs" fontWeight="500">{g.label}: {g.gap} ft</FormLabel>
                  <Input
                    type="number"
                    size="sm"
                    placeholder={g.gap}
                    value={gapInputs[index]}
                    onChange={(e) => handleGapInputChange(index, e.target.value)}
                    min="0"
                    step="0.1"
                    bg="white"
                    borderColor="gray.300"
                  />
                </FormControl>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </VStack>

      <Flex justifyContent="space-between" mt={6}>
        <Button onClick={onBack} variant="outline" colorScheme="gray" size="sm">
          ← Previous
        </Button>
        <Button onClick={handleAction} colorScheme="teal" size="sm">
          {isLastStep ? "Submit" : "Next →"}
        </Button>
      </Flex>
    </Box>
  );
}
