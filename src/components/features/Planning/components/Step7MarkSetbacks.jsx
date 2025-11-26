import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Heading,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Divider,
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
  const svgRef = useRef(null);
  const scaleRef = useRef({ shiftX: 0, shiftY: 0, finalScale: 1 });
  const [modelPoints, setModelPoints] = useState(null);
  const [bounding, setBounding] = useState(null);
  const [buildingPoints, setBuildingPoints] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [dragType, setDragType] = useState(null);
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
    const setback = 2.5; // Increased for more gap
    const centerX = (bounding.minX + bounding.maxX) / 2;
    const centerY = (bounding.minY + bounding.maxY) / 2;
    const availableW = totalW - setback * 2;
    const availableH = totalH - setback * 2;
    const size = Math.min(availableW, availableH) * 0.80; // Reduced from 0.98 to 0.80
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
      const fallbackSize = Math.min(availableW, availableH) * 0.75; // Reduced from 0.95 to 0.75
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

  // Start dragging a corner point
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
      setDragType('corner');
      setDragging(true);
      setIsInteracting(true);
    },
    [getModelFromMouse, buildingPoints]
  );

  // Start dragging an edge
  const handleEdgeStart = useCallback(
    (edgeIndex, e, isTouch = false) => {
      if (isTouch) e.preventDefault();
      e.stopPropagation();

      const p1Index = edgeIndex;
      const p2Index = (edgeIndex + 1) % 4;
      const edgeMid = {
        x: (buildingPoints[p1Index].x + buildingPoints[p2Index].x) / 2,
        y: (buildingPoints[p1Index].y + buildingPoints[p2Index].y) / 2,
      };

      const p = isTouch ? getModelFromTouch(e) : getModelFromMouse(e);
      setDragOffset({
        x: p.x - edgeMid.x,
        y: p.y - edgeMid.y,
      });

      setDragPointIndex(edgeIndex);
      setDragType('edge');
      setDragging(true);
      setIsInteracting(true);
    },
    [getModelFromMouse, buildingPoints]
  );

  // Handle dragging
  const handleMove = useCallback(
    (e, isTouch = false) => {
      if (!dragging || dragPointIndex === -1 || !bounding) return;
      if (isTouch) e.preventDefault();

      const p = isTouch ? getModelFromTouch(e) : getModelFromMouse(e);

      if (dragType === 'corner') {
        // Corner dragging logic
        const newX = p.x - dragOffset.x;
        const newY = p.y - dragOffset.y;
        const newPoint = { x: newX, y: newY };

        if (isPointValid(newPoint)) {
          const newPoints = [...buildingPoints];
          newPoints[dragPointIndex] = newPoint;
          setBuildingPoints(newPoints);
          setGapInputs(Array(8).fill(""));
        }
      } else if (dragType === 'edge') {
        // Edge dragging logic
        const p1Index = dragPointIndex;
        const p2Index = (dragPointIndex + 1) % 4;

        const currentMid = {
          x: (buildingPoints[p1Index].x + buildingPoints[p2Index].x) / 2,
          y: (buildingPoints[p1Index].y + buildingPoints[p2Index].y) / 2,
        };

        const targetMid = {
          x: p.x - dragOffset.x,
          y: p.y - dragOffset.y,
        };

        const deltaX = targetMid.x - currentMid.x;
        const deltaY = targetMid.y - currentMid.y;

        const newP1 = {
          x: buildingPoints[p1Index].x + deltaX,
          y: buildingPoints[p1Index].y + deltaY,
        };
        const newP2 = {
          x: buildingPoints[p2Index].x + deltaX,
          y: buildingPoints[p2Index].y + deltaY,
        };

        if (isPointValid(newP1) && isPointValid(newP2)) {
          const newPoints = [...buildingPoints];
          newPoints[p1Index] = newP1;
          newPoints[p2Index] = newP2;
          setBuildingPoints(newPoints);
          setGapInputs(Array(8).fill(""));
        }
      }
    },
    [dragging, dragPointIndex, dragType, bounding, getModelFromMouse, dragOffset, buildingPoints, isPointValid]
  );

  // Finish interaction
  const handleEnd = useCallback(() => {
    setDragging(false);
    setDragType(null);
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
      if (dragging) handleMove(e);
    };
    const handleGlobalMouseUp = () => handleEnd();

    const handleGlobalTouchMove = (e) => {
      if (dragging) handleMove(e, true);
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
  }, [dragging, handleMove, handleEnd]);

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
      [modelPoints.tl, modelPoints.tr],
      [modelPoints.tr, modelPoints.br],
      [modelPoints.br, modelPoints.bl],
      [modelPoints.bl, modelPoints.tl],
    ];

    const points = buildingPoints;

    const mids = [
      { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 },
      { x: (points[1].x + points[2].x) / 2, y: (points[1].y + points[2].y) / 2 },
      { x: (points[2].x + points[3].x) / 2, y: (points[2].y + points[3].y) / 2 },
      { x: (points[3].x + points[0].x) / 2, y: (points[3].y + points[0].y) / 2 },
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

  // Calculate diagonal distances
  const calculateDiagonals = useCallback(() => {
    if (buildingPoints.length !== 4) return { diagonal1: 0, diagonal2: 0 };

    const diagonal1 = Math.round(
      Math.hypot(
        buildingPoints[2].x - buildingPoints[0].x,
        buildingPoints[2].y - buildingPoints[0].y
      ) * 10
    ) / 10;

    const diagonal2 = Math.round(
      Math.hypot(
        buildingPoints[3].x - buildingPoints[1].x,
        buildingPoints[3].y - buildingPoints[1].y
      ) * 10
    ) / 10;

    return { diagonal1, diagonal2 };
  }, [buildingPoints]);

  const currentGaps = calculateGaps();
  const diagonals = calculateDiagonals();

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
    const finalScale = Math.min(viewW / boundingW, viewH / boundingH) * 0.85; // Keep this large for outer plot
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
    const cornerRadius = 8;
    const edgeRadius = 6;

    // Calculate edge midpoints
    const edgeMidpoints = [
      { x: (screenBuildingPoints[0].x + screenBuildingPoints[1].x) / 2, y: (screenBuildingPoints[0].y + screenBuildingPoints[1].y) / 2 },
      { x: (screenBuildingPoints[1].x + screenBuildingPoints[2].x) / 2, y: (screenBuildingPoints[1].y + screenBuildingPoints[2].y) / 2 },
      { x: (screenBuildingPoints[2].x + screenBuildingPoints[3].x) / 2, y: (screenBuildingPoints[2].y + screenBuildingPoints[3].y) / 2 },
      { x: (screenBuildingPoints[3].x + screenBuildingPoints[0].x) / 2, y: (screenBuildingPoints[3].y + screenBuildingPoints[0].y) / 2 },
    ];

    return (
      <svg
        ref={svgRef}
        width={viewW}
        height={viewH}
        style={{ touchAction: "none", border: "1px solid #e2e8f0", borderRadius: "8px" }}
        onTouchStart={(e) => e.preventDefault()}
      >
        {/* Plot boundary */}
        <polygon
          points={`${screenPlotPoints.tl.x},${screenPlotPoints.tl.y} ${screenPlotPoints.tr.x},${screenPlotPoints.tr.y} ${screenPlotPoints.br.x},${screenPlotPoints.br.y} ${screenPlotPoints.bl.x},${screenPlotPoints.bl.y}`}
          fill="rgba(229, 231, 235, 0.4)"
          stroke="#94a3b8"
          strokeWidth="4"
          strokeDasharray="5,5"
        />

        <text x={viewW / 2} y={16} textAnchor="middle" fontSize="12" fontWeight="600" fill="#64748b">
          Plot Boundary
        </text>


        {/* Gap lines and labels */}
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
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.8"
              />
              <text
                x={midX}
                y={midY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="#4a5568"
                fillOpacity="0.9"
                pointerEvents="none"
                fontWeight="bold"
              >
                {gap.gap} ft
              </text>
            </g>
          );
        })}

        {/* Diagonals */}
        {screenBuildingPoints.length === 4 && (
          <>
            <line
              x1={screenBuildingPoints[0].x}
              y1={screenBuildingPoints[0].y}
              x2={screenBuildingPoints[2].x}
              y2={screenBuildingPoints[2].y}
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="6,3"
              opacity="0.6"
            />
            <line
              x1={screenBuildingPoints[1].x}
              y1={screenBuildingPoints[1].y}
              x2={screenBuildingPoints[3].x}
              y2={screenBuildingPoints[3].y}
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="6,3"
              opacity="0.6"
            />

            <text
              x={(screenBuildingPoints[0].x + screenBuildingPoints[2].x) / 2}
              y={(screenBuildingPoints[0].y + screenBuildingPoints[2].y) / 2 - 6}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#4338ca"
              pointerEvents="none"
            >
              {diagonals.diagonal1} ft
            </text>

            <text
              x={(screenBuildingPoints[1].x + screenBuildingPoints[3].x) / 2}
              y={(screenBuildingPoints[1].y + screenBuildingPoints[3].y) / 2 + 14}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#4338ca"
              pointerEvents="none"
            >
              {diagonals.diagonal2} ft
            </text>
          </>
        )}

        {/* Building polygon */}
        {screenBuildingPoints.length > 2 && (
          <polygon
            points={screenBuildingPoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="#3b82f6"
            strokeWidth="2.5"
          />
        )}

        {screenBuildingPoints.length > 2 && (
          <text
            x={screenBuildingPoints.reduce((sum, p) => sum + p.x, 0) / screenBuildingPoints.length}
            y={screenBuildingPoints.reduce((sum, p) => sum + p.y, 0) / screenBuildingPoints.length}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="600"
            fill="#1e40af"
            pointerEvents="none"
          >
            Building Area
          </text>
        )}

        {/* Edge midpoint handles */}
        {edgeMidpoints.map((midpoint, index) => (
          <circle
            key={`edge-${index}`}
            cx={midpoint.x}
            cy={midpoint.y}
            r={edgeRadius}
            fill="#e0f2fe"
            stroke="#06b6d4"
            strokeWidth="2.5"
            style={{ cursor: "move" }}
            onMouseDown={(e) => handleEdgeStart(index, e)}
            onTouchStart={(e) => handleEdgeStart(index, e, true)}
          />
        ))}

        {/* Corner handles */}
        {screenBuildingPoints.map((point, index) => (
          <circle
            key={`corner-${index}`}
            cx={point.x}
            cy={point.y}
            r={cornerRadius}
            fill="white"
            stroke="#3b82f6"
            strokeWidth="3"
            style={{ cursor: "grab" }}
            onMouseDown={(e) => handlePointStart(index, e)}
            onTouchStart={(e) => handlePointStart(index, e, true)}
          />
        ))}

        {/* Corner number labels */}
        {screenBuildingPoints.map((point, index) => (
          <text
            key={`label-${index}`}
            x={point.x}
            y={point.y + 18}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="#3b82f6"
            pointerEvents="none"
          >
            {index + 1}
          </text>
        ))}
      </svg>
    );
  };

  const resetToSquare = () => {
    if (!bounding) return;

    const totalW = bounding.maxX - bounding.minX;
    const totalH = bounding.maxY - bounding.minY;
    const setback = 2.5;
    const centerX = (bounding.minX + bounding.maxX) / 2;
    const centerY = (bounding.minY + bounding.maxY) / 2;
    const availableW = totalW - setback * 2;
    const availableH = totalH - setback * 2;
    const size = Math.min(availableW, availableH) * 0.80;
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
      const fallbackSize = Math.min(availableW, availableH) * 0.75;
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
      h="600px"
      w="100%"
      maxW="400px"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      px={4}
      py={6}
    >
      <Box
        flex="1"
        overflowY="auto"
        overflowX="hidden"
        pr={2}
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e0",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#a0aec0",
          },
        }}
      >
        <VStack spacing={4} align="stretch">
          <Heading size="sm" color="cyan.600">
            Define Building Area
          </Heading>

          <Text fontSize="13px" color="gray.600" textAlign="center">
            Drag corner points or edge midpoints to customize your building area. Dashed lines show distances to plot boundary.
          </Text>

          <Box height="280px" mx="auto" maxWidth="350px">
            {renderDiagram()}
          </Box>

          <Text fontSize="12px" color="blue.600" textAlign="center" fontWeight="500">
            🔵 Corners • 🔷 Edge Midpoints • ➕ Diagonals
          </Text>

          <Button onClick={resetToSquare} size="sm" variant="outline" colorScheme="blue" alignSelf="center">
            Reset to Square
          </Button>

          <Box bg="gray.50" p={4} borderRadius="10px" w="100%">
            <Text fontSize="13px" color="black" mb={3} fontWeight="700">
              Setback Gaps at Key Positions:
            </Text>
            <SimpleGrid columns={2} spacing={3}>
              {currentGaps.map((g, index) => (
                <FormControl key={g.label} isDisabled size="sm">
                  <FormLabel fontSize="11px" fontWeight="600" mb={1} color="black">
                    {g.label}
                  </FormLabel>
                  <Input
                    type="number"
                    size="sm"
                    value={g.gap}
                    isReadOnly
                    min="0"
                    step="0.1"
                    bg="gray.100"
                    borderColor="gray.300"
                    fontWeight="bold"
                    fontSize="12px"
                    color="black"
                  />
                </FormControl>
              ))}
            </SimpleGrid>

            <Divider my={4} borderColor="gray.300" />

            <Text fontSize="13px" color="black" mb={3} fontWeight="700">
              Diagonal Measurements:
            </Text>
            <SimpleGrid columns={2} spacing={3}>
              <FormControl isDisabled size="sm">
                <FormLabel fontSize="11px" fontWeight="600" mb={1} color="black">
                  Diagonal 1 (Corner 1→3)
                </FormLabel>
                <Input
                  type="number"
                  size="sm"
                  value={diagonals.diagonal1}
                  isReadOnly
                  bg="indigo.50"
                  borderColor="indigo.300"
                  fontWeight="bold"
                  fontSize="12px"
                  color="black"
                />
              </FormControl>

              <FormControl isDisabled size="sm">
                <FormLabel fontSize="11px" fontWeight="600" mb={1} color="black">
                  Diagonal 2 (Corner 2→4)
                </FormLabel>
                <Input
                  type="number"
                  size="sm"
                  value={diagonals.diagonal2}
                  isReadOnly
                  bg="indigo.50"
                  borderColor="indigo.300"
                  fontWeight="bold"
                  fontSize="12px"
                  color="black"
                />
              </FormControl>
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>

      <Flex justify="space-between" gap={3} mt={4} flexShrink={0}>
        <Button
          onClick={onBack}
          variant="solid"
          bg="white"
          color="cyan.600"
          border="1px solid"
          borderColor="cyan.500"
          borderRadius="6px"
          minW="100px"
          h="40px"
          fontWeight="500"
          fontSize="14px"
          _hover={{
            bg: "cyan.50",
            borderColor: "cyan.600",
          }}
        >
          ← Previous
        </Button>

        <Button
          onClick={handleAction}
          variant="solid"
          bg="cyan.500"
          color="white"
          border="none"
          borderRadius="6px"
          minW="100px"
          h="40px"
          fontWeight="500"
          fontSize="14px"
          ml="auto"
          _hover={{
            bg: "cyan.600",
          }}
        >
          {isLastStep ? "Submit" : "Next →"}
        </Button>
      </Flex>
    </Box>
  );
}
