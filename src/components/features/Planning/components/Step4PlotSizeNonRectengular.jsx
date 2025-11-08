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
import NeighbourHomeImage from "../../../../assets/Planning/NeighboursHouse/Rectangle 9607.png";
import RoadImage from "../../../../assets/Planning/RoadImage/Group 35547.png";


function getSideImage(side, peripheries) {
  if (!peripheries) return null;
  const value = peripheries[side];
  if (!value) return null;
  if (value === "Road") return RoadImage;
  if (value === "Neighbour Plot") return NeighbourHomeImage;
  return null;
}


function toPosNum(v, fallback) {
  const n = parseFloat(v);
  if (!isFinite(n)) return fallback;
  const abs = Math.abs(n);
  return abs < 0.0001 ? fallback : abs;
}


// Centroid calculation for quadrilateral
function getCentroid(points) {
  let x = 0, y = 0;
  for (const p of points) {
    x += p.x;
    y += p.y;
  }
  return { x: x / points.length, y: y / points.length };
}


export default function Step4PlotSizeNonRectangular({
  formData,
  setFormData,
  onNext,
  onSubmit,
  onBack,
  isLastStep,
}) {
  const svgSize = 350; // Further reduced height
  const containerPadding = 15;


  // Handlers for inputs
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
  const [currentScale, setCurrentScale] = useState(4);
  const [viewBox, setViewBox] = useState("0 0 400 400");


  // Input defaulting with larger trapezium dimensions
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      size: {
        ...(prev.size || {}),
        front: prev.size?.front ?? 70, // Increased from 50
        back: prev.size?.back ?? 50,   // Increased from 30
        left: prev.size?.left ?? 40,   // Increased from 25
        right: prev.size?.right ?? 50, // Increased from 36
        offset: prev.size?.offset ?? 0,
      },
    }));
  }, []);


  // Enhanced points calculation with better constraints
  useEffect(() => {
    const front = toPosNum(formData.size?.front, 70); // Updated default
    const back = toPosNum(formData.size?.back, 50);   // Updated default
    const left = toPosNum(formData.size?.left, 40);   // Updated default
    const right = toPosNum(formData.size?.right, 50); // Updated default
    let offset = parseFloat(formData.size?.offset) || 0;


    // Better constraint calculation to prevent line mixing
    const maxOffset = Math.min(
      (front - back) / 2, 
      left * 0.8, // Reduced to 80% to prevent mixing
      right * 0.8
    );
    const minOffset = -maxOffset;
    
    // Clamp offset to valid range
    offset = Math.max(minOffset, Math.min(maxOffset, offset));


    const bl_x = -front / 2;
    const br_x = front / 2;
    const tl_x = -back / 2 + offset;
    const tr_x = back / 2 + offset;


    const dx_left = tl_x - bl_x;
    const dx_right = tr_x - br_x;


    // Improved height calculation with minimum separation
    const minSeparation = 5; // Minimum distance to keep lines separate
    const h_left = Math.sqrt(Math.max(minSeparation ** 2, left ** 2 - dx_left ** 2));
    const h_right = Math.sqrt(Math.max(minSeparation ** 2, right ** 2 - dx_right ** 2));


    const logical = {
      bl: { x: bl_x, y: 0 },
      br: { x: br_x, y: 0 },
      tl: { x: tl_x, y: h_left },
      tr: { x: tr_x, y: h_right },
    };


    // Calculate bounds for proper scaling and centering
    const xs = [logical.bl.x, logical.br.x, logical.tl.x, logical.tr.x];
    const ys = [logical.bl.y, logical.br.y, logical.tl.y, logical.tr.y];


    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);


    const spanX = maxX - minX;
    const spanY = maxY - minY;
    
    // Better scaling with padding
    const padding = 80;
    const availableWidth = svgSize - padding;
    const availableHeight = svgSize - padding;
    
    let scale = Math.min(
      availableWidth / (spanX || 1),
      availableHeight / (spanY || 1)
    );
    scale = Math.min(scale, 6); // Max scale limit


    setCurrentScale(scale);


    // Center the shape in the SVG
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const svgCenterX = svgSize / 2;
    const svgCenterY = svgSize / 2;


    setViewBox(`0 0 ${svgSize} ${svgSize}`);
    setPoints({ ...logical, centerX, centerY, svgCenterX, svgCenterY });
  }, [formData.size]);


  // Improved drag handling with better constraints
  const handleMouseDown = (key, e) => {
    e.preventDefault();
    setDragging(key);
  };


  const handleMouseUp = () => {
    if (dragging && points) {
      const back = toPosNum(formData.size?.back, 50); // Updated default
      let new_offset;
      if (dragging === "backLine") {
        // For back line, offset is calculated from the midpoint of tl and tr
        new_offset = (points.tl.x + points.tr.x) / 2;
      } else {
        new_offset = points.tl.x + back / 2;
      }
      
      // Ensure offset stays within valid bounds
      const front = toPosNum(formData.size?.front, 70); // Updated default
      const left = toPosNum(formData.size?.left, 40);   // Updated default
      const right = toPosNum(formData.size?.right, 50); // Updated default
      
      const maxOffset = Math.min((front - back) / 2, left * 0.8, right * 0.8);
      const minOffset = -maxOffset;
      const clampedOffset = Math.max(minOffset, Math.min(maxOffset, new_offset));
      
      setFormData({
        ...formData,
        size: { ...formData.size, offset: clampedOffset.toFixed(1) },
      });
    }
    setDragging(null);
  };


  const handleMouseMove = (e) => {
    if (!dragging || !points) return;
    
    const svg_rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - svg_rect.left;
    
    // Convert mouse position to logical coordinates
    const logical_mouse_x = (mouseX - points.svgCenterX) / currentScale + points.centerX;


    const front = toPosNum(formData.size?.front, 70); // Updated default
    const back = toPosNum(formData.size?.back, 50);   // Updated default
    const left = toPosNum(formData.size?.left, 40);   // Updated default
    const right = toPosNum(formData.size?.right, 50); // Updated default


    // Enhanced constraint calculation
    const maxOffset = Math.min((front - back) / 2, left * 0.8, right * 0.8);
    const minOffset = -maxOffset;


    let proposed_offset;
    if (dragging === "tl") {
      proposed_offset = logical_mouse_x + back / 2;
    } else if (dragging === "tr") {
      proposed_offset = logical_mouse_x - back / 2;
    } else if (dragging === "backLine") {
      proposed_offset = logical_mouse_x;
    }


    const clamped_offset = Math.max(minOffset, Math.min(maxOffset, proposed_offset));


    const new_tl_x = clamped_offset - back / 2;
    const new_tr_x = clamped_offset + back / 2;


    const new_dx_left = new_tl_x - points.bl.x;
    const new_dx_right = new_tr_x - points.br.x;


    const minSeparation = 5;
    const new_h_left = Math.sqrt(Math.max(minSeparation ** 2, left ** 2 - new_dx_left ** 2));
    const new_h_right = Math.sqrt(Math.max(minSeparation ** 2, right ** 2 - new_dx_right ** 2));


    setPoints({
      ...points,
      tl: { x: new_tl_x, y: new_h_left },
      tr: { x: new_tr_x, y: new_h_right },
    });
  };


  // Helper functions for measurements and positioning
  const lineMidpoint = (p1, p2) => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  });


  const lineLength = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2).toFixed(1);


  // Transform logical coordinates to SVG coordinates
  const transform = (p) => {
    if (!points) return { x: 0, y: 0 };
    return {
      x: (p.x - points.centerX) * currentScale + points.svgCenterX,
      y: (points.centerY - p.y) * currentScale + points.svgCenterY, // Flip Y axis
    };
  };


  // Render the improved diagram
  const renderDiagram = () => {
    if (!points) return null;
    
    const { bl, br, tl, tr } = points;
    
    // Transform all points
    const sbl = transform(bl);
    const sbr = transform(br);
    const stl = transform(tl);
    const str = transform(tr);


    const centroid_logical = getCentroid([bl, br, tr, tl]);
    const centroid = transform(centroid_logical);


    // Label positions
    const frontLabelPos = transform(lineMidpoint(bl, br));
    const backLabelPos = transform(lineMidpoint(tl, tr));
    const leftLabelPos = transform(lineMidpoint(bl, tl));
    const rightLabelPos = transform(lineMidpoint(br, tr));
    const diag1LabelPos = transform(lineMidpoint(bl, tr)); // bl to tr diagonal
    const diag2LabelPos = transform(lineMidpoint(br, tl)); // br to tl diagonal


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
          border: "2px solid #cbd5e0", 
          borderRadius: "12px",
          cursor: dragging ? 'grabbing' : 'default',
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        {/* Background grid for better visualization */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Main polygon with gradient fill */}
        <defs>
          <linearGradient id="plotGrad" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="rgba(56, 178, 172, 0.2)" />
            <stop offset="100%" stopColor="rgba(14, 116, 144, 0.3)" />
          </linearGradient>
        </defs>
        
        <polygon
          points={`${sbl.x},${sbl.y} ${sbr.x},${sbr.y} ${str.x},${str.y} ${stl.x},${stl.y}`}
          fill="url(#plotGrad)"
          stroke="#2d3748"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {/* Measurement lines with better styling */}
        {/* Front width */}
        <line x1={sbl.x} y1={sbl.y} x2={sbr.x} y2={sbr.y} stroke="#38a169" strokeWidth="3" strokeLinecap="round" />
        {/* Back width - now draggable */}
        <line 
          x1={stl.x} 
          y1={stl.y} 
          x2={str.x} 
          y2={str.y} 
          stroke="#38a169" 
          strokeWidth="6" 
          strokeLinecap="round" 
          onMouseDown={(e) => handleMouseDown("backLine", e)}
          style={{ cursor: dragging === "backLine" ? "grabbing" : "grab" }}
        />
        {/* Left depth */}
        <line x1={sbl.x} y1={sbl.y} x2={stl.x} y2={stl.y} stroke="#ed8936" strokeWidth="3" strokeLinecap="round" />
        {/* Right depth */}
        <line x1={sbr.x} y1={sbr.y} x2={str.x} y2={str.y} stroke="#ed8936" strokeWidth="3" strokeLinecap="round" />
        
        {/* Diagonal lines */}
        <line x1={sbl.x} y1={sbl.y} x2={str.x} y2={str.y} stroke="#805ad5" strokeWidth="2" 
              strokeDasharray="6,4" strokeLinecap="round" opacity="0.8" />
        <line x1={sbr.x} y1={sbr.y} x2={stl.x} y2={stl.y} stroke="#805ad5" strokeWidth="2" 
              strokeDasharray="6,4" strokeLinecap="round" opacity="0.8" />
        
        {/* Enhanced labels with backgrounds */}
        {/* Front width label */}
        <g>
          <rect x={frontLabelPos.x - 35} y={frontLabelPos.y + 8} width="70" height="16" 
                fill="white" stroke="#38a169" strokeWidth="1" rx="8" opacity="0.9"/>
          <text x={frontLabelPos.x} y={frontLabelPos.y + 18} textAnchor="middle" 
                fontSize="11" fontWeight="600" fill="#38a169">
            Front: {Math.abs(bl.x - br.x).toFixed(1)}ft
          </text>
        </g>
        
        {/* Back width label - moved further away from the line */}
        <g>
          <rect x={backLabelPos.x - 35} y={backLabelPos.y - 35} width="70" height="16" 
                fill="white" stroke="#38a169" strokeWidth="1" rx="8" opacity="0.9"/>
          <text x={backLabelPos.x} y={backLabelPos.y - 25} textAnchor="middle" 
                fontSize="11" fontWeight="600" fill="#38a169">
            Back: {Math.abs(tl.x - tr.x).toFixed(1)}ft
          </text>
        </g>
        
        {/* Left depth label */}
        <g>
          <rect x={leftLabelPos.x - 45} y={leftLabelPos.y - 8} width="35" height="16" 
                fill="white" stroke="#ed8936" strokeWidth="1" rx="8" opacity="0.9"/>
          <text x={leftLabelPos.x - 27} y={leftLabelPos.y + 2} textAnchor="middle" 
                fontSize="11" fontWeight="600" fill="#ed8936">
            {lineLength(bl, tl)}ft
          </text>
        </g>
        
        {/* Right depth label */}
        <g>
          <rect x={rightLabelPos.x + 10} y={rightLabelPos.y - 8} width="35" height="16" 
                fill="white" stroke="#ed8936" strokeWidth="1" rx="8" opacity="0.9"/>
          <text x={rightLabelPos.x + 27} y={rightLabelPos.y + 2} textAnchor="middle" 
                fontSize="11" fontWeight="600" fill="#ed8936">
            {lineLength(br, tr)}ft
          </text>
        </g>
        
        {/* Diagonal labels inside the SVG */}
        <g>
          <rect x={diag1LabelPos.x - 25} y={diag1LabelPos.y - 8} width="50" height="16" 
                fill="white" stroke="#805ad5" strokeWidth="1" rx="8" opacity="0.9"/>
          <text x={diag1LabelPos.x} y={diag1LabelPos.y + 2} textAnchor="middle" 
                fontSize="10" fontWeight="600" fill="#805ad5">
            {lineLength(bl, tr)}ft
          </text>
        </g>
        
        <g>
          <rect x={diag2LabelPos.x - 25} y={diag2LabelPos.y - 8} width="50" height="16" 
                fill="white" stroke="#805ad5" strokeWidth="1" rx="8" opacity="0.9"/>
          <text x={diag2LabelPos.x} y={diag2LabelPos.y + 2} textAnchor="middle" 
                fontSize="10" fontWeight="600" fill="#805ad5">
            {lineLength(br, tl)}ft
          </text>
        </g>


        {/* Reduced compass size */}
        <image 
          x={centroid.x - 75} 
          y={centroid.y - 75} 
          width="150" 
          height="150" 
          href={CompassImage} 
          style={{ pointerEvents: 'none', opacity: 0.7 }} 
        />
        
        {/* Enhanced draggable corners */}
        <g>
          {/* Top corners - draggable */}
          <circle cx={stl.x} cy={stl.y} r="10" fill="#e53e3e" stroke="white" strokeWidth="2" 
                  onMouseDown={(e) => handleMouseDown("tl", e)} 
                  style={{ cursor: dragging === "tl" ? "grabbing" : "grab" }} />
          <circle cx={str.x} cy={str.y} r="10" fill="#e53e3e" stroke="white" strokeWidth="2" 
                  onMouseDown={(e) => handleMouseDown("tr", e)} 
                  style={{ cursor: dragging === "tr" ? "grabbing" : "grab" }} />
          
          {/* Bottom corners - fixed */}
          <circle cx={sbl.x} cy={sbl.y} r="8" fill="#718096" stroke="white" strokeWidth="2" />
          <circle cx={sbr.x} cy={sbr.y} r="8" fill="#718096" stroke="white" strokeWidth="2" />
          
          {/* Corner labels */}
          <text x={stl.x - 15} y={stl.y - 12} fontSize="10" fill="#e53e3e" fontWeight="bold">TL</text>
          <text x={str.x + 8} y={str.y - 12} fontSize="10" fill="#e53e3e" fontWeight="bold">TR</text>
          <text x={sbl.x - 15} y={sbl.y + 18} fontSize="10" fill="#718096" fontWeight="bold">BL</text>
          <text x={sbr.x + 8} y={sbr.y + 18} fontSize="10" fill="#718096" fontWeight="bold">BR</text>
        </g>
      </svg>
    );
  };


  const handleAction = isLastStep ? onSubmit : onNext;


  return (
    <Box maxWidth="800px" mx="auto" p={4}>
      <VStack spacing={6}>
        <Box textAlign="center">
          <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={2}>
            Plot Dimensions Configuration
          </Text>
        </Box>


        {/* Input controls in a more organized layout */}
        <Box bg="gray.50" p={4} borderRadius="lg" border="1px solid" borderColor="gray.200">
          <VStack spacing={4}>
            <HStack spacing={6} justify="center">
              <Box>
                <Text fontSize="sm" mb={2} color="gray.600" fontWeight="500">
                  Front Width
                </Text>
                <InputGroup size="sm" maxW="100px">
                  <Input 
                    value={formData.size?.front ?? ""} 
                    onChange={handleFrontChange} 
                    type="number"
                    min="1"
                    bg="white"
                    borderColor="green.300"
                    _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #38a169" }}
                  />
                  <InputRightAddon bg="green.100" color="green.700">ft</InputRightAddon>
                </InputGroup>
              </Box>
              
              <Box>
                <Text fontSize="sm" mb={2} color="gray.600" fontWeight="500">
                  Back Width
                </Text>
                <InputGroup size="sm" maxW="100px">
                  <Input 
                    value={formData.size?.back ?? ""} 
                    onChange={handleBackChange} 
                    type="number"
                    min="1"
                    bg="white"
                    borderColor="green.300"
                    _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #38a169" }}
                  />
                  <InputRightAddon bg="green.100" color="green.700">ft</InputRightAddon>
                </InputGroup>
              </Box>
            </HStack>
            
            <HStack spacing={6} justify="center">
              <Box>
                <Text fontSize="sm" mb={2} color="gray.600" fontWeight="500">
                  Left Depth
                </Text>
                <InputGroup size="sm" maxW="100px">
                  <Input 
                    value={formData.size?.left ?? ""} 
                    onChange={handleLeftChange} 
                    type="number"
                    min="1"
                    bg="white"
                    borderColor="orange.300"
                    _focus={{ borderColor: "orange.500", boxShadow: "0 0 0 1px #ed8936" }}
                  />
                  <InputRightAddon bg="orange.100" color="orange.700">ft</InputRightAddon>
                </InputGroup>
              </Box>
              
              <Box>
                <Text fontSize="sm" mb={2} color="gray.600" fontWeight="500">
                  Right Depth
                </Text>
                <InputGroup size="sm" maxW="100px">
                  <Input 
                    value={formData.size?.right ?? ""} 
                    onChange={handleRightChange} 
                    type="number"
                    min="1"
                    bg="white"
                    borderColor="orange.300"
                    _focus={{ borderColor: "orange.500", boxShadow: "0 0 0 1px #ed8936" }}
                  />
                  <InputRightAddon bg="orange.100" color="orange.700">ft</InputRightAddon>
                </InputGroup>
              </Box>
            </HStack>
          </VStack>
        </Box>


        {/* Diagram container with proper constraints */}
        <Box 
          width="100%" 
          maxWidth={`${svgSize + containerPadding}px`}
          height={`${svgSize + containerPadding}px`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          p={2}
          position="relative" // enable absolute overlay
        >
          {/* Top overlay simple text labels (non-pill) */}
          {points && (
            <Box
              position="absolute"
              top="2"
              left="0"
              right="0"
              display="flex"
              justifyContent="center"
              pointerEvents="none" // allow dragging through
              zIndex={1}
            >
              <HStack spacing={3}>
                <Text as="span" fontSize="xs" fontWeight="600" color="purple.700">
                  BL→TR: {lineLength(points.bl, points.tr)}ft
                </Text>
                <Text as="span" fontSize="xs" fontWeight="600" color="purple.700">
                  BR→TL: {lineLength(points.br, points.tl)}ft
                </Text>
              </HStack>
            </Box>
          )}

          {renderDiagram()}
        </Box>


        {/* Navigation buttons */}
        <HStack justify="space-between" width="100%" maxWidth="400px" pt={4}>
          <Button 
            onClick={onBack} 
            variant="outline" 
            size="md"
            leftIcon={<Box as="span">←</Box>}
            colorScheme="gray"
          >
            Previous
          </Button>
          <Button 
            onClick={handleAction} 
            colorScheme="teal" 
            size="md"
            rightIcon={!isLastStep ? <Box as="span">→</Box> : undefined}
          >
            {isLastStep ? "Submit" : "Next"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
