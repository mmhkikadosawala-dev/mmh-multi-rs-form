// src/features/Planning/components/Step4PlotSizeNonRectangular.jsx
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CompassImage from "../../../../assets/Planning/Compass/illustration-compass 1.png";

function toPosNum(v, fallback) {
  const n = parseFloat(v);
  if (!isFinite(n)) return fallback;
  const abs = Math.abs(n);
  return abs < 0.0001 ? fallback : abs;
}

function getCentroid(points) {
  let x = 0,
    y = 0;
  for (const p of points) {
    x += p.x;
    y += p.y;
  }
  return { x: x / points.length, y: y / points.length };
}

function clampOffset(offset, front, back, left, right, minSeparation) {
  const delta = (front - back) / 2;
  const maxDxLeft = Math.sqrt(left ** 2 - minSeparation ** 2);
  const maxDxRight = Math.sqrt(right ** 2 - minSeparation ** 2);
  const minO = Math.max(-maxDxLeft - delta, -maxDxRight + delta);
  const maxO = Math.min(maxDxLeft - delta, maxDxRight + delta);
  return Math.max(minO, Math.min(maxO, offset));
}

export default function Step4PlotSizeNonRectangular({
  formData,
  setFormData,
  onNext,
  onSubmit,
  onBack,
  isLastStep,
}) {
  const svgSize = 280;

  const handleFrontChange = (e) =>
    setFormData({
      ...formData,
      size: { ...(formData.size || {}), front: e.target.value },
    });
  const handleBackChange = (e) =>
    setFormData({
      ...formData,
      size: { ...(formData.size || {}), back: e.target.value },
    });
  const handleLeftChange = (e) =>
    setFormData({
      ...formData,
      size: { ...(formData.size || {}), left: e.target.value },
    });
  const handleRightChange = (e) =>
    setFormData({
      ...formData,
      size: { ...(formData.size || {}), right: e.target.value },
    });

  const svgRef = useRef(null);
  const [points, setPoints] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [initialDragX, setInitialDragX] = useState(null);
  const [currentScale, setCurrentScale] = useState(4);
  const [viewBox, setViewBox] = useState("0 0 400 400");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      size: {
        ...(prev.size || {}),
        front: prev.size?.front ?? 70,
        back: prev.size?.back ?? 50,
        left: prev.size?.left ?? 40,
        right: prev.size?.right ?? 50,
        offset: prev.size?.offset ?? 0,
      },
    }));
  }, []);

  useEffect(() => {
    const front = toPosNum(formData.size?.front, 70);
    const back = toPosNum(formData.size?.back, 50);
    const left = toPosNum(formData.size?.left, 40);
    const right = toPosNum(formData.size?.right, 50);
    let offset = parseFloat(formData.size?.offset) || 0;

    const minSeparation = 1;
    offset = clampOffset(offset, front, back, left, right, minSeparation);

    const bl_x = -front / 2;
    const br_x = front / 2;
    const tl_x = -back / 2 + offset;
    const tr_x = back / 2 + offset;

    const dx_left = tl_x - bl_x;
    const dx_right = tr_x - br_x;

    const h_left = Math.sqrt(Math.max(minSeparation ** 2, left ** 2 - dx_left ** 2));
    const h_right = Math.sqrt(Math.max(minSeparation ** 2, right ** 2 - dx_right ** 2));

    const logical = {
      bl: { x: bl_x, y: 0 },
      br: { x: br_x, y: 0 },
      tl: { x: tl_x, y: h_left },
      tr: { x: tr_x, y: h_right },
    };

    const xs = [logical.bl.x, logical.br.x, logical.tl.x, logical.tr.x];
    const ys = [logical.bl.y, logical.br.y, logical.tl.y, logical.tr.y];

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const spanX = maxX - minX;
    const spanY = maxY - minY;

    const padding = 60;
    const availableWidth = svgSize - padding;
    const availableHeight = svgSize - padding;

    let scale = Math.min(availableWidth / (spanX || 1), availableHeight / (spanY || 1));
    scale = Math.min(scale, 6);

    setCurrentScale(scale);

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const svgCenterX = svgSize / 2;
    const svgCenterY = svgSize / 2;

    setViewBox(`0 0 ${svgSize} ${svgSize}`);
    setPoints({ ...logical, centerX, centerY, svgCenterX, svgCenterY });
  }, [formData.size]);

  const handleMouseDown = (key, e) => {
    e.preventDefault();
    if (!points) return;

    const svg_rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - svg_rect.left;
    const logicalX = (mouseX - points.svgCenterX) / currentScale + points.centerX;

    let initX;
    if (key === "tl") {
      initX = points.tl.x;
    } else if (key === "tr") {
      initX = points.tr.x;
    } else if (key === "backLine") {
      initX = logicalX;
    }

    setInitialDragX(initX);
    setDragging(key);
  };

  const handleMouseUp = () => {
    if (dragging && points) {
      const back = toPosNum(formData.size?.back, 50);
      let new_offset;
      if (dragging === "backLine") {
        new_offset = (points.tl.x + points.tr.x) / 2;
      } else {
        new_offset = points.tl.x + back / 2;
      }

      const front = toPosNum(formData.size?.front, 70);
      const left = toPosNum(formData.size?.left, 40);
      const right = toPosNum(formData.size?.right, 50);

      const minSeparation = 1;
      const clampedOffset = clampOffset(new_offset, front, back, left, right, minSeparation);

      setFormData({
        ...formData,
        size: { ...formData.size, offset: clampedOffset.toFixed(1) },
      });
    }
    setDragging(null);
    setInitialDragX(null);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !points || initialDragX === null) return;

    const svg_rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - svg_rect.left;
    const logical_mouse_x = (mouseX - points.svgCenterX) / currentScale + points.centerX;

    const front = toPosNum(formData.size?.front, 70);
    const back = toPosNum(formData.size?.back, 50);
    const left = toPosNum(formData.size?.left, 40);
    const right = toPosNum(formData.size?.right, 50);

    const delta = logical_mouse_x - initialDragX;
    const current_offset = parseFloat(formData.size?.offset) || 0;
    let proposed_offset = current_offset + delta;

    const minSeparation = 1;
    const clamped_offset = clampOffset(proposed_offset, front, back, left, right, minSeparation);

    const new_tl_x = clamped_offset - back / 2;
    const new_tr_x = clamped_offset + back / 2;

    const new_dx_left = new_tl_x - points.bl.x;
    const new_dx_right = new_tr_x - points.br.x;

    const new_h_left = Math.sqrt(Math.max(minSeparation ** 2, left ** 2 - new_dx_left ** 2));
    const new_h_right = Math.sqrt(Math.max(minSeparation ** 2, right ** 2 - new_dx_right ** 2));

    setPoints({
      ...points,
      tl: { x: new_tl_x, y: new_h_left },
      tr: { x: new_tr_x, y: new_h_right },
    });
  };

  const lineMidpoint = (p1, p2) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  });

  const lineLength = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2).toFixed(1);

  const transform = (p) => {
    if (!points) return { x: 0, y: 0 };
    return {
      x: (p.x - points.centerX) * currentScale + points.svgCenterX,
      y: (points.centerY - p.y) * currentScale + points.svgCenterY,
    };
  };

  const renderDiagram = () => {
    if (!points) return null;

    const { bl, br, tl, tr } = points;

    const sbl = transform(bl);
    const sbr = transform(br);
    const stl = transform(tl);
    const str = transform(tr);

    const centroid_logical = getCentroid([bl, br, tr, tl]);
    const centroid = transform(centroid_logical);

    const frontLabelPos = transform(lineMidpoint(bl, br));
    const backLabelPos = transform(lineMidpoint(tl, tr));
    const leftLabelPos = transform(lineMidpoint(bl, tl));
    const rightLabelPos = transform(lineMidpoint(br, tr));

    let leftRectX = leftLabelPos.x - 38;
    let leftTextX = leftLabelPos.x - 23;
    if (leftRectX < 0) {
      leftRectX = leftLabelPos.x + 8;
      leftTextX = leftLabelPos.x + 23;
    }

    let rightRectX = rightLabelPos.x + 8;
    let rightTextX = rightLabelPos.x + 23;
    if (rightRectX + 30 > svgSize) {
      rightRectX = rightLabelPos.x - 38;
      rightTextX = rightLabelPos.x - 23;
    }

    return (
      <svg
        ref={svgRef}
        width={svgSize}
        height={svgSize}
        viewBox={viewBox}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          border: "1px solid #cbd5e0",
          borderRadius: "10px",
          cursor: dragging ? "grabbing" : "default",
        }}
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="plotGrad" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="rgba(56, 178, 172, 0.2)" />
            <stop offset="100%" stopColor="rgba(14, 116, 144, 0.3)" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        <polygon
          points={`${sbl.x},${sbl.y} ${sbr.x},${sbr.y} ${str.x},${str.y} ${stl.x},${stl.y}`}
          fill="url(#plotGrad)"
          stroke="#2d3748"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <line x1={sbl.x} y1={sbl.y} x2={sbr.x} y2={sbr.y} stroke="#38a169" strokeWidth="2.5" strokeLinecap="round" />
        <line
          x1={stl.x}
          y1={stl.y}
          x2={str.x}
          y2={str.y}
          stroke="#38a169"
          strokeWidth="5"
          strokeLinecap="round"
          onMouseDown={(e) => handleMouseDown("backLine", e)}
          style={{ cursor: dragging === "backLine" ? "grabbing" : "grab" }}
        />
        <line x1={sbl.x} y1={sbl.y} x2={stl.x} y2={stl.y} stroke="#ed8936" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={sbr.x} y1={sbr.y} x2={str.x} y2={str.y} stroke="#ed8936" strokeWidth="2.5" strokeLinecap="round" />

        <line
          x1={sbl.x}
          y1={sbl.y}
          x2={str.x}
          y2={str.y}
          stroke="#805ad5"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1={sbr.x}
          y1={sbr.y}
          x2={stl.x}
          y2={stl.y}
          stroke="#805ad5"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          strokeLinecap="round"
          opacity="0.6"
        />

        <g>
          <rect
            x={frontLabelPos.x - 30}
            y={frontLabelPos.y + 6}
            width="60"
            height="14"
            fill="white"
            stroke="#38a169"
            strokeWidth="1"
            rx="7"
            opacity="0.95"
          />
          <text x={frontLabelPos.x} y={frontLabelPos.y + 16} textAnchor="middle" fontSize="10" fontWeight="600" fill="#38a169">
            {Math.abs(bl.x - br.x).toFixed(1)}ft
          </text>
        </g>

        <g>
          <rect
            x={backLabelPos.x - 30}
            y={backLabelPos.y - 28}
            width="60"
            height="14"
            fill="white"
            stroke="#38a169"
            strokeWidth="1"
            rx="7"
            opacity="0.95"
          />
          <text x={backLabelPos.x} y={backLabelPos.y - 18} textAnchor="middle" fontSize="10" fontWeight="600" fill="#38a169">
            {Math.abs(tl.x - tr.x).toFixed(1)}ft
          </text>
        </g>

        <g>
          <rect
            x={leftRectX}
            y={leftLabelPos.y - 7}
            width="30"
            height="14"
            fill="white"
            stroke="#ed8936"
            strokeWidth="1"
            rx="7"
            opacity="0.95"
          />
          <text x={leftTextX} y={leftLabelPos.y + 3} textAnchor="middle" fontSize="10" fontWeight="600" fill="#ed8936">
            {lineLength(bl, tl)}ft
          </text>
        </g>

        <g>
          <rect
            x={rightRectX}
            y={rightLabelPos.y - 7}
            width="30"
            height="14"
            fill="white"
            stroke="#ed8936"
            strokeWidth="1"
            rx="7"
            opacity="0.95"
          />
          <text x={rightTextX} y={rightLabelPos.y + 3} textAnchor="middle" fontSize="10" fontWeight="600" fill="#ed8936">
            {lineLength(br, tr)}ft
          </text>
        </g>

        <image
          x={centroid.x - 60}
          y={centroid.y - 60}
          width="120"
          height="120"
          href={CompassImage}
          style={{ pointerEvents: "none", opacity: 0.6 }}
        />

        <g>
          <circle
            cx={stl.x}
            cy={stl.y}
            r="8"
            fill="#e53e3e"
            stroke="white"
            strokeWidth="2"
            onMouseDown={(e) => handleMouseDown("tl", e)}
            style={{ cursor: dragging === "tl" ? "grabbing" : "grab" }}
          />
          <circle
            cx={str.x}
            cy={str.y}
            r="8"
            fill="#e53e3e"
            stroke="white"
            strokeWidth="2"
            onMouseDown={(e) => handleMouseDown("tr", e)}
            style={{ cursor: dragging === "tr" ? "grabbing" : "grab" }}
          />

          <circle cx={sbl.x} cy={sbl.y} r="6" fill="#718096" stroke="white" strokeWidth="2" />
          <circle cx={sbr.x} cy={sbr.y} r="6" fill="#718096" stroke="white" strokeWidth="2" />
        </g>
      </svg>
    );
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
      {/* Scrollable Content Area */}
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
          {/* Title */}
          <Text fontWeight="600" color="gray.700" fontSize="17px" letterSpacing="-0.01em">
            Plot Dimensions
          </Text>

          {/* Instructions */}
          <Text fontSize="13px" color="gray.600" textAlign="center" mb={1}>
            🖱️ Enter dimensions below or drag the top corners to adjust shape
          </Text>

          {/* Input Controls */}
          <Box bg="white" p={4} borderRadius="12px" border="1px solid" borderColor="gray.200">
            <VStack spacing={3}>
              <HStack spacing={3} width="100%">
                <Box flex="1">
                  <Text fontSize="12px" mb={1.5} color="gray.600" fontWeight="500">
                    Front Width
                  </Text>
                  <InputGroup size="sm">
                    <Input
                      value={formData.size?.front ?? ""}
                      onChange={handleFrontChange}
                      type="number"
                      min="1"
                      bg="white"
                      borderColor="green.300"
                      fontSize="13px"
                      _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #38a169" }}
                    />
                    <InputRightAddon bg="green.100" color="green.700" fontSize="12px">
                      ft
                    </InputRightAddon>
                  </InputGroup>
                </Box>

                <Box flex="1">
                  <Text fontSize="12px" mb={1.5} color="gray.600" fontWeight="500">
                    Back Width
                  </Text>
                  <InputGroup size="sm">
                    <Input
                      value={formData.size?.back ?? ""}
                      onChange={handleBackChange}
                      type="number"
                      min="1"
                      bg="white"
                      borderColor="green.300"
                      fontSize="13px"
                      _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #38a169" }}
                    />
                    <InputRightAddon bg="green.100" color="green.700" fontSize="12px">
                      ft
                    </InputRightAddon>
                  </InputGroup>
                </Box>
              </HStack>

              <HStack spacing={3} width="100%">
                <Box flex="1">
                  <Text fontSize="12px" mb={1.5} color="gray.600" fontWeight="500">
                    Left Depth
                  </Text>
                  <InputGroup size="sm">
                    <Input
                      value={formData.size?.left ?? ""}
                      onChange={handleLeftChange}
                      type="number"
                      min="1"
                      bg="white"
                      borderColor="orange.300"
                      fontSize="13px"
                      _focus={{ borderColor: "orange.500", boxShadow: "0 0 0 1px #ed8936" }}
                    />
                    <InputRightAddon bg="orange.100" color="orange.700" fontSize="12px">
                      ft
                    </InputRightAddon>
                  </InputGroup>
                </Box>

                <Box flex="1">
                  <Text fontSize="12px" mb={1.5} color="gray.600" fontWeight="500">
                    Right Depth
                  </Text>
                  <InputGroup size="sm">
                    <Input
                      value={formData.size?.right ?? ""}
                      onChange={handleRightChange}
                      type="number"
                      min="1"
                      bg="white"
                      borderColor="orange.300"
                      fontSize="13px"
                      _focus={{ borderColor: "orange.500", boxShadow: "0 0 0 1px #ed8936" }}
                    />
                    <InputRightAddon bg="orange.100" color="orange.700" fontSize="12px">
                      ft
                    </InputRightAddon>
                  </InputGroup>
                </Box>
              </HStack>
            </VStack>
          </Box>

          {/* Diagram */}
          <Box width="100%" display="flex" justifyContent="center" bg="white" borderRadius="10px" p={2}>
            {renderDiagram()}
          </Box>

          {/* Diagonal Measurements */}
          {points && (
            <Box bg="purple.50" p={3} borderRadius="8px" border="1px solid" borderColor="purple.200">
              <Text fontSize="11px" fontWeight="600" color="purple.700" mb={1.5}>
                Diagonal Measurements:
              </Text>
              <HStack spacing={3} fontSize="11px" color="purple.700">
                <Text>
                  BL→TR: <strong>{lineLength(points.bl, points.tr)}ft</strong>
                </Text>
                <Text>
                  BR→TL: <strong>{lineLength(points.br, points.tl)}ft</strong>
                </Text>
              </HStack>
            </Box>
          )}
        </VStack>
      </Box>

      {/* Fixed Navigation Buttons */}
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