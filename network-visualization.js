// Визуализация квантовой сети рисков

function renderRiskNetwork(networkData) {
    const container = document.getElementById('riskNetwork');
    container.innerHTML = '';
    
    const width = container.clientWidth;
    const height = 500;
    
    // Создаем SVG
    const svg = d3.select("#riskNetwork")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // Определяем силу гравитации и другие параметры
    const simulation = d3.forceSimulation(networkData.risks)
        .force("link", d3.forceLink(networkData.connections).id(d => d.id).distance(100).strength(0.2))
        .force("charge", d3.forceManyBody().strength(-150))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => getRiskSize(d) + 5));
    
    // Создаем связи
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(networkData.connections)
        .enter()
        .append("line")
        .attr("stroke-width", d => d.strength * 3)
        .attr("stroke", d => getLinkColor(d.strength))
        .attr("stroke-opacity", d => d.strength * 0.7);
    
    // Создаем узлы
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(networkData.risks)
        .enter()
        .append("circle")
        .attr("r", d => getRiskSize(d))
        .attr("fill", d => getRiskColor(d))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    // Добавляем названия
    const label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(networkData.risks)
        .enter()
        .append("text")
        .text(d => d.name)
        .attr("font-size", "12px")
        .attr("dx", d => getRiskSize(d) + 5)
        .attr("dy", ".35em")
        .attr("fill", "#333");
    
    // Обновляем позиции при каждом тике симуляции
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        node
            .attr("cx", d => d.x = Math.max(getRiskSize(d), Math.min(width - getRiskSize(d), d.x)))
            .attr("cy", d => d.y = Math.max(getRiskSize(d), Math.min(height - getRiskSize(d), d.y)));
        
        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
    
    // Функции для drag-and-drop
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    // Легенда
    const legend = svg.append("g")
        .attr("transform", `translate(20, 20)`);
    
    legend.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text("Квантовая сеть рисков")
        .attr("font-weight", "bold")
        .attr("font-size", "14px");
    
    // Категории рисков
    const categories = [...new Set(networkData.risks.map(r => r.category))];
    categories.forEach((category, i) => {
        legend.append("circle")
            .attr("cx", 0)
            .attr("cy", i * 20 + 20)
            .attr("r", 6)
            .attr("fill", getCategoryColor(category));
        
        legend.append("text")
            .attr("x", 15)
            .attr("y", i * 20 + 24)
            .text(capitalizeFirstLetter(category))
            .attr("font-size", "12px");
    });
    
    // Сила запутанности
    legend.append("line")
        .attr("x1", 0)
        .attr("y1", categories.length * 20 + 30)
        .attr("x2", 30)
        .attr("y2", categories.length * 20 + 30)
        .attr("stroke", "#6a0dad")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.5);
    
    legend.append("line")
        .attr("x1", 0)
        .attr("y1", categories.length * 20 + 50)
        .attr("x2", 30)
        .attr("y2", categories.length * 20 + 50)
        .attr("stroke", "#6a0dad")
        .attr("stroke-width", 3)
        .attr("stroke-opacity", 0.7);
    
    legend.append("text")
        .attr("x", 35)
        .attr("y", categories.length * 20 + 34)
        .text("Слабая связь")
        .attr("font-size", "11px");
    
    legend.append("text")
        .attr("x", 35)
        .attr("y", categories.length * 20 + 54)
        .text("Сильная связь")
        .attr("font-size", "11px");
}

function getRiskSize(risk) {
    // Размер узла зависит от комбинации влияния и вероятности
    return 8 + (risk.impact * risk.probability) * 12;
}

function getRiskColor(risk) {
    // Цвет узла зависит от категории риска
    return getCategoryColor(risk.category);
}

function getCategoryColor(category) {
    const colors = {
        'compliance': '#4a154b',
        'technical': '#6a0dad',
        'security': '#9b5de5',
        'market': '#00bbf9',
        'resource': '#00f5d4',
        'environmental': '#f15bb5',
        'financial': '#fecd1a',
        'organizational': '#9bf6ff'
    };
    return colors[category] || '#666';
}

function getLinkColor(strength) {
    // Цвет связи зависит от силы запутанности
    return d3.interpolateRgb('#aaa', '#4a154b')(strength);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderInfluenceMatrix(networkData) {
    const container = document.getElementById('influenceMatrix');
    container.innerHTML = '';
    
    const width = container.clientWidth;
    const height = 500;
    const cellSize = Math.min(40, width / (networkData.risks.length + 1));
    
    // Создаем SVG
    const svg = d3.select("#influenceMatrix")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // Ось X (столбцы)
    svg.selectAll(".x-axis")
        .data(networkData.risks)
        .enter()
        .append("text")
        .attr("x", (d, i) => cellSize * (i + 1.5))
        .attr("y", cellSize / 2)
        .attr("text-anchor", "middle")
        .attr("transform", `rotate(-45, ${cellSize * (i + 1.5)}, ${cellSize / 2})`)
        .text(d => d.name)
        .attr("font-size", "10px")
        .attr("fill", "#333");
    
    // Ось Y (строки)
    svg.selectAll(".y-axis")
        .data(networkData.risks)
        .enter()
        .append("text")
        .attr("x", cellSize / 2)
        .attr("y", (d, i) => cellSize * (i + 1.5))
        .attr("text-anchor", "end")
        .attr("dy", "0.35em")
        .text(d => d.name)
        .attr("font-size", "10px")
        .attr("fill", "#333");
    
    // Ячейки матрицы
    const cells = svg.selectAll(".cell")
        .data(networkData.connections)
        .enter()
        .append("rect")
        .attr("x", d => cellSize * (networkData.risks.findIndex(r => r.id === d.target.id) + 1))
        .attr("y", d => cellSize * (networkData.risks.findIndex(r => r.id === d.source.id) + 1))
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("fill", d => d3.interpolateRgb('#e0e0e0', '#4a154b')(d.strength))
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5);
    
    // Значения в ячейках
    cells.append("title")
        .text(d => `Сила связи: ${(d.strength * 100).toFixed(0)}%`);
    
    // Легенда
    const legendWidth = 200;
    const legendHeight = 20;
    const legendX = width - legendWidth - 30;
    const legendY = height - 50;
    
    const legend = svg.append("g")
        .attr("transform", `translate(${legendX}, ${legendY})`);
    
    // Градиентная шкала
    const linearGradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    
    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#e0e0e0");
    
    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#4a154b");
    
    legend.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legend-gradient)");
    
    // Метки
    legend.append("text")
        .attr("x", 0)
        .attr("y", legendHeight + 15)
        .text("Слабая")
        .attr("font-size", "12px");
    
    legend.append("text")
        .attr("x", legendWidth)
        .attr("y", legendHeight + 15)
        .text("Сильная")
        .attr("text-anchor", "end")
        .attr("font-size", "12px");
    
    legend.append("text")
        .attr("x", legendWidth / 2)
        .attr("y", -10)
        .text("Сила квантовой запутанности")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold");
}

function simulateRiskScenario(networkData) {
    const container = document.getElementById('riskNetwork');
    const svg = d3.select(container).select("svg");
    
    // Выбираем случайный риск как отправную точку
    const startIndex = Math.floor(Math.random() * networkData.risks.length);
    const startRisk = networkData.risks[startIndex];
    
    // Создаем анимацию распространения
    const node = svg.selectAll(".nodes circle")
        .filter((d, i) => i === startIndex);
    
    const label = svg.selectAll(".labels text")
        .filter((d, i) => i === startIndex);
    
    // Анимация эффекта
    node
        .transition()
        .duration(500)
        .attr("r", d => getRiskSize(d) * 1.5)
        .attr("stroke-width", 3)
        .attr("stroke", "#ff0000")
        .transition()
        .duration(1000)
        .attr("r", d => getRiskSize(d))
        .attr("stroke-width", 1.5)
        .attr("stroke", "#fff");
    
    label
        .transition()
        .duration(500)
        .attr("font-weight", "bold")
        .attr("fill", "#ff0000")
        .transition()
        .duration(1000)
        .attr("font-weight", "normal")
        .attr("fill", "#333");
    
    // Анимация распространения по связям
    const links = svg.selectAll(".links line")
        .filter(d => d.source.index === startIndex || d.target.index === startIndex);
    
    links
        .transition()
        .duration(300)
        .attr("stroke-width", d => d.strength * 6)
        .attr("stroke", "#ff0000")
        .transition()
        .duration(700)
        .attr("stroke-width", d => d.strength * 3)
        .attr("stroke", d => getLinkColor(d.strength));
}
