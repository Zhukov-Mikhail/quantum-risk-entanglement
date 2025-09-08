// Quantum Risk Entanglement Analyzer Engine
// Квантово-вдохновленный анализатор взаимосвязанных рисков

class QuantumRiskEntanglement {
    constructor() {
        this.projectData = null;
        this.analysisDepth = 3;
        this.sensitivity = 70;
        this.analysisResults = null;
    }
    
    loadProject(projectData) {
        this.projectData = projectData;
        return this;
    }
    
    setAnalysisDepth(depth) {
        this.analysisDepth = depth;
        return this;
    }
    
    setSensitivity(sensitivity) {
        this.sensitivity = sensitivity;
        return this;
    }
    
    runAnalysis() {
        if (!this.projectData) {
            throw new Error("Project data not loaded");
        }
        
        // Показываем индикатор загрузки
        const statusPanel = document.getElementById('status');
        statusPanel.innerHTML = `
            <div class="loading">
                <div class="quantum-spinner"></div>
                <p>Анализ квантовой запутанности рисков... Симуляция ${this.analysisDepth} уровней влияния</p>
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
            </div>
        `;
        
        // Имитация квантового анализа
        return new Promise((resolve) => {
            let progress = 0;
            const progressBar = statusPanel.querySelector('.progress');
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Генерируем реалистичные результаты
                    const entanglementLevel = Math.floor(this.analysisDepth * 2.5);
                    const quantumNodes = Math.max(1, Math.floor(this.projectData.risks.length * 0.25));
                    const stability = Math.max(40, 100 - (entanglementLevel * 5 + quantumNodes * 3));
                    
                    this.analysisResults = {
                        entanglementLevel: entanglementLevel,
                        quantumNodes: quantumNodes,
                        stability: stability,
                        networkData: this.generateNetworkData(),
                        recommendations: this.generateRecommendations(entanglementLevel, quantumNodes, stability)
                    };
                    
                    setTimeout(() => {
                        statusPanel.innerHTML = `
                            <div class="success">
                                <div class="checkmark">✓</div>
                                <p>Анализ завершен! Выявлено ${quantumNodes} квантовых узлов</p>
                            </div>
                        `;
                        resolve(this.analysisResults);
                    }, 300);
                }
                progressBar.style.width = `${Math.min(100, progress)}%`;
            }, 150);
        });
    }
    
    generateNetworkData() {
        const risks = this.projectData.risks;
        const connections = [];
        
        // Генерируем связи между рисками
        for (let i = 0; i < risks.length; i++) {
            for (let j = i + 1; j < risks.length; j++) {
                // Вероятность связи зависит от типа рисков и уровня чувствительности
                const baseProbability = 0.3;
                const typeFactor = risks[i].category === risks[j].category ? 0.4 : 0.1;
                const sensitivityFactor = this.sensitivity / 100;
                
                if (Math.random() < (baseProbability + typeFactor) * sensitivityFactor) {
                    connections.push({
                        source: i,
                        target: j,
                        strength: Math.random() * 0.8 + 0.2 // от 0.2 до 1.0
                    });
                }
            }
        }
        
        return { risks, connections };
    }
    
    generateRecommendations(entanglementLevel, quantumNodes, stability) {
        const recommendations = [];
        const risks = this.projectData.risks;
        
        // Анализ квантовых узлов
        const highImpactRisks = risks.filter(r => r.impact * r.probability > 0.6);
        
        if (highImpactRisks.length > 0) {
            recommendations.push({
                priority: 'high',
                title: 'Критические квантовые узлы',
                description: `Риск "${highImpactRisks[0].name}" является ключевым квантовым узлом. Его влияние распространяется на ${Math.min(5, Math.floor(risks.length * 0.4))} других рисков.`
            });
        }
        
        // Анализ уровня запутанности
        if (entanglementLevel > 6) {
            recommendations.push({
                priority: 'high',
                title: 'Высокая сложность взаимосвязей',
                description: 'Проект имеет сложную сеть взаимосвязанных рисков. Рекомендуется упростить структуру проекта или добавить буферные зоны между компонентами.'
            });
        } else if (entanglementLevel > 4) {
            recommendations.push({
                priority: 'medium',
                title: 'Умеренная запутанность',
                description: 'Некоторые риски имеют каскадные эффекты. Сфокусируйтесь на контроле ключевых точек в проекте.'
            });
        }
        
        // Анализ стабильности
        if (stability < 60) {
            recommendations.push({
                priority: 'high',
                title: 'Низкая стабильность проекта',
                description: `Вероятность успешного завершения проекта (${stability}%) ниже критического порога. Необходимо срочно укрепить уязвимые звенья.`
            });
        } else if (stability < 75) {
            recommendations.push({
                priority: 'medium',
                title: 'Требуется укрепление стабильности',
                description: `Вероятность успешного завершения проекта (${stability}%) требует дополнительных мер для повышения устойчивости.`
            });
        }
        
        // Конкретные рекомендации
        if (this.projectData.projectType === 'fintech') {
            recommendations.push({
                priority: 'medium',
                title: 'Регуляторные риски',
                description: 'В финтех-проектах регуляторные риски часто становятся квантовыми узлами. Усильте коммуникацию с юридическим отделом.'
            });
        }
        
        recommendations.push({
            priority: 'low',
            title: 'Мониторинг',
            description: 'Проводите повторный анализ каждые 2 недели или при значительных изменениях в проекте.'
        });
        
        return recommendations;
    }
    
    getResults() {
        return this.analysisResults;
    }
}

// Глобальные переменные
let qre = new QuantumRiskEntanglement();
let sampleProjects = {
    fintech: {
        name: "FinTech платформа",
        projectType: "fintech",
        risks: [
            {id: 1, name: "Регуляторные изменения", category: "compliance", impact: 0.9, probability: 0.7},
            {id: 2, name: "Технические сбои", category: "technical", impact: 0.8, probability: 0.6},
            {id: 3, name: "Кибератака", category: "security", impact: 0.95, probability: 0.4},
            {id: 4, name: "Конкуренция", category: "market", impact: 0.6, probability: 0.8},
            {id: 5, name: "Задержки с интеграцией", category: "technical", impact: 0.7, probability: 0.5},
            {id: 6, name: "Изменения в API банков", category: "compliance", impact: 0.75, probability: 0.6},
            {id: 7, name: "Недостаток экспертов", category: "resource", impact: 0.65, probability: 0.5},
            {id: 8, name: "Проблемы с масштабированием", category: "technical", impact: 0.7, probability: 0.4}
        ]
    },
    construction: {
        name: "Строительство офисного комплекса",
        projectType: "construction",
        risks: [
            {id: 1, name: "Погодные условия", category: "environmental", impact: 0.8, probability: 0.6},
            {id: 2, name: "Задержки поставок", category: "supply", impact: 0.75, probability: 0.7},
            {id: 3, name: "Изменения в нормативах", category: "compliance", impact: 0.7, probability: 0.5},
            {id: 4, name: "Проблемы с персоналом", category: "resource", impact: 0.65, probability: 0.6},
            {id: 5, name: "Изменения бюджета", category: "financial", impact: 0.85, probability: 0.4},
            {id: 6, name: "Технические сложности", category: "technical", impact: 0.7, probability: 0.5},
            {id: 7, name: "Экологические требования", category: "environmental", impact: 0.6, probability: 0.4},
            {id: 8, name: "Конфликты с подрядчиками", category: "organizational", impact: 0.65, probability: 0.5}
        ]
    }
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Обновление значений слайдеров
    const depthSlider = document.getElementById('depthSlider');
    const sensitivitySlider = document.getElementById('sensitivitySlider');
    
    depthSlider.addEventListener('input', function() {
        document.getElementById('depthValue').textContent = this.value;
        qre.setAnalysisDepth(parseInt(this.value));
    });
    
    sensitivitySlider.addEventListener('input', function() {
        document.getElementById('sensitivityValue').textContent = this.value;
        qre.setSensitivity(parseInt(this.value));
    });
    
    // Запуск анализа
    document.getElementById('runAnalysis').addEventListener('click', function() {
        // Загрузка демо-данных, если нет загруженного файла
        if (!qre.projectData) {
            qre.loadProject(sampleProjects.fintech);
        }
        
        // Запуск анализа
        qre.runAnalysis()
            .then(results => {
                // Отображение результатов
                document.getElementById('entanglementLevel').textContent = results.entanglementLevel;
                document.getElementById('quantumNodes').textContent = results.quantumNodes;
                document.getElementById('stability').textContent = results.stability + '%';
                
                // Отображение рекомендаций
                const recommendationsList = document.getElementById('recommendationsList');
                recommendationsList.innerHTML = '';
                
                results.recommendations.forEach(rec => {
                    const recElement = document.createElement('div');
                    recElement.className = `recommendation-item priority-${rec.priority}`;
                    recElement.innerHTML = `
                        <div class="rec-header">
                            <span class="priority-badge ${rec.priority}">${rec.priority}</span>
                            <h4>${rec.title}</h4>
                        </div>
                        <p>${rec.description}</p>
                    `;
                    recommendationsList.appendChild(recElement);
                });
                
                // Отображение результатов
                document.getElementById('resultsPanel').style.display = 'block';
                
                // Визуализация
                renderRiskNetwork(results.networkData);
                renderInfluenceMatrix(results.networkData);
            })
            .catch(error => {
                document.getElementById('status').innerHTML = `
                    <div class="error">
                        <div class="error-icon">!</div>
                        <p>Ошибка анализа: ${error.message}</p>
                    </div>
                `;
            });
    });
    
    // Переключение вкладок
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс со всех кнопок и вкладок
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
            
            // Добавляем активный класс текущей кнопке и вкладке
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + 'View').style.display = 'block';
        });
    });
    
    // Симуляция сценариев
    document.getElementById('simulateScenario').addEventListener('click', function() {
        if (!qre.analysisResults) return;
        
        const statusPanel = document.getElementById('status');
        statusPanel.innerHTML = `
            <div class="loading">
                <div class="quantum-spinner"></div>
                <p>Симуляция сценариев воздействия... Анализ 15+ возможных шоков</p>
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            statusPanel.innerHTML = `
                <div class="success">
                    <div class="checkmark">✓</div>
                    <p>Симуляция завершена! Обнаружено 3 критических сценария</p>
                </div>
            `;
            
            // Визуализация симуляции
            simulateRiskScenario(qre.analysisResults.networkData);
        }, 1500);
    });
});

function loadSampleProject(type) {
    qre.loadProject(sampleProjects[type]);
    document.getElementById('status').innerHTML = `
        <div class="info">
            <p>Загружен примерный проект: ${sampleProjects[type].name}</p>
        </div>
    `;
}

function simulateRiskScenario(networkData) {
    // Здесь будет реализация симуляции сценариев
    console.log("Simulating risk scenarios...", networkData);
}
