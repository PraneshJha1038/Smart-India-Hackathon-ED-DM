// DisasterEd Platform JavaScript

// Application data
const appData = {
    modules: [
        {
            id: 'earthquake',
            title: 'Earthquake Basics',
            progress: 0,
            status: 'Not Started',
            duration: '45 min',
            difficulty: 'Beginner',
            description: 'Learn essential earthquake safety and response techniques',
            lessons: ['Understanding Earthquakes', 'Drop, Cover, Hold On', 'After the Shaking', 'Emergency Kits'],
            icon: 'fas fa-home'
        },
        {
            id: 'fire',
            title: 'Fire Safety Essentials',
            progress: 0,
            status: 'Not Started',
            duration: '30 min',
            difficulty: 'Beginner',
            description: 'Comprehensive fire prevention and evacuation strategies',
            lessons: ['Fire Prevention', 'Escape Planning', 'Fire Extinguishers', 'Smoke Safety'],
            icon: 'fas fa-fire'
        },
        {
            id: 'flood',
            title: 'Flood Preparedness',
            progress: 0,
            status: 'Not Started',
            duration: '35 min',
            difficulty: 'Intermediate',
            description: 'Flood safety measures and emergency response procedures',
            lessons: ['Flood Risks', 'Emergency Evacuation', 'Water Safety', 'Recovery Planning'],
            icon: 'fas fa-water'
        }
    ],
    drills: [
        {
            id: 'earthquake-drill',
            title: 'Earthquake Response Drill',
            description: 'Practice earthquake response in different scenarios',
            duration: '10 min',
            completed: false,
            icon: 'fas fa-home'
        },
        {
            id: 'fire-drill',
            title: 'Fire Evacuation Drill',
            description: 'Learn and practice fire evacuation procedures',
            duration: '8 min',
            completed: false,
            icon: 'fas fa-fire'
        },
        {
            id: 'flood-drill',
            title: 'Flood Emergency Response',
            description: 'Practice flood emergency response and evacuation',
            duration: '12 min',
            completed: false,
            icon: 'fas fa-water'
        }
    ],
    alerts: [
        {
            type: 'Weather Warning',
            title: 'Severe Thunderstorm Watch',
            message: 'Thunderstorms with heavy rain and strong winds expected in the area. Stay indoors and avoid windows.',
            severity: 'Medium',
            time: '2 hours ago',
            icon: 'fas fa-cloud-rain'
        },
        {
            type: 'Campus Alert',
            title: 'Emergency Drill Scheduled',
            message: 'Campus-wide emergency evacuation drill scheduled for next Tuesday at 2:00 PM.',
            severity: 'Low',
            time: '1 day ago',
            icon: 'fas fa-bell'
        }
    ],
    contacts: {
        emergency: [
            { name: 'Emergency Services', number: '911', desc: 'Police, Fire, Medical' },
            { name: 'Campus Security', number: '(555) 123-4567', desc: '24/7 Campus Safety' }
        ],
        medical: [
            { name: 'Campus Health Center', number: '(555) 234-5678', desc: 'Student Health Services' },
            { name: 'Local Hospital', number: '(555) 345-6789', desc: 'Regional Medical Center' }
        ],
        campus: [
            { name: 'Student Services', number: '(555) 456-7890', desc: 'Academic Support' },
            { name: 'Maintenance', number: '(555) 567-8901', desc: 'Facilities & Repairs' }
        ]
    },
    activities: [
        {
            title: 'Account Created',
            description: 'Welcome to DisasterEd! Your learning journey begins now.',
            time: 'Today, 2:30 PM',
            icon: 'fas fa-user-plus',
            type: 'success'
        },
        {
            title: 'Regional Alert Subscribed',
            description: 'You\'ll now receive emergency alerts for your area.',
            time: 'Today, 2:25 PM',
            icon: 'fas fa-bell',
            type: 'info'
        }
    ]
};

// User progress tracking
let userProgress = {
    modulesCompleted: 0,
    drillsCompleted: 0,
    preparednessScore: 0,
    badgesEarned: 0,
    classRank: '#-'
};

// Current page state
let currentPage = 'dashboard';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing DisasterEd application...');
    initializeNavigation();
    initializeInteractiveElements();
    updateDashboardMetrics();
    renderAllPages();
    showWelcomeMessage();
});

// Navigation system
function initializeNavigation() {
    console.log('Setting up navigation...');
    
    // Handle sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const pageId = item.getAttribute('data-page');
        
        if (link && pageId) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Navigating to page:', pageId);
                navigateToPage(pageId);
            });
        }
    });

    // Handle navigation buttons
    document.addEventListener('click', function(e) {
        const navigateButton = e.target.closest('[data-navigate]');
        if (navigateButton) {
            e.preventDefault();
            const pageId = navigateButton.getAttribute('data-navigate');
            console.log('Button navigation to:', pageId);
            navigateToPage(pageId);
        }
    });
}

function navigateToPage(pageId) {
    console.log('Switching to page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Page activated:', pageId + '-page');
    } else {
        console.error('Page not found:', pageId + '-page');
        return;
    }

    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }

    currentPage = pageId;
    
    // Show page-specific notification
    showNotification(`Navigated to ${getPageTitle(pageId)}`, 'info');
}

function getPageTitle(pageId) {
    const titles = {
        'dashboard': 'Dashboard',
        'modules': 'Education Modules',
        'drills': 'Virtual Drills',
        'alerts': 'Regional Alerts',
        'contacts': 'Emergency Contacts',
        'settings': 'Settings'
    };
    return titles[pageId] || 'Page';
}

// Initialize all interactive elements
function initializeInteractiveElements() {
    console.log('Initializing interactive elements...');
    
    // Initialize user profile click
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            console.log('User profile clicked');
            navigateToPage('settings');
        });
    }

    // Initialize notification icon
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            console.log('Notification icon clicked');
            showNotificationPanel();
        });
    }

    // Initialize settings form handlers
    initializeSettingsHandlers();

    // Initialize modal close handlers
    initializeModalHandlers();
}

function initializeModalHandlers() {
    const modal = document.getElementById('drill-modal');
    if (modal) {
        const closeButton = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        if (closeButton) {
            closeButton.addEventListener('click', closeDrillModal);
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeDrillModal);
        }
    }
}

// Page rendering functions
function renderAllPages() {
    console.log('Rendering all pages...');
    renderModulesPage();
    renderDrillsPage();
    renderAlertsPage();
    renderContactsPage();
    renderDashboardProgress();
    renderRecentActivity();
}

function renderModulesPage() {
    const modulesGrid = document.getElementById('modules-grid');
    if (!modulesGrid) {
        console.log('Modules grid not found');
        return;
    }

    modulesGrid.innerHTML = '';

    appData.modules.forEach(module => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.innerHTML = `
            <div class="module-header">
                <div class="module-icon">
                    <i class="${module.icon}"></i>
                </div>
                <h3 class="module-card-title">${module.title}</h3>
            </div>
            <p class="module-description">${module.description}</p>
            <div class="module-meta">
                <span>Duration: ${module.duration}</span>
                <span>Level: ${module.difficulty}</span>
            </div>
            <div class="module-progress">
                <div class="progress-header">
                    <span class="progress-label">Progress</span>
                    <span class="progress-percentage">${module.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${module.progress}%"></div>
                </div>
            </div>
            <div class="module-actions">
                <button class="btn btn--primary module-start-btn" data-module-id="${module.id}">
                    ${module.progress === 0 ? 'Start Module' : 'Continue'}
                </button>
                <span class="status-badge status-badge--${getStatusClass(module.status)}">${module.status}</span>
            </div>
        `;
        
        // Add event listener to the start button
        const startButton = moduleCard.querySelector('.module-start-btn');
        startButton.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module-id');
            console.log('Starting module:', moduleId);
            startModule(moduleId);
        });
        
        modulesGrid.appendChild(moduleCard);
    });
    
    console.log('Modules page rendered with', appData.modules.length, 'modules');
}

function renderDrillsPage() {
    const drillsGrid = document.getElementById('drills-grid');
    if (!drillsGrid) {
        console.log('Drills grid not found');
        return;
    }

    drillsGrid.innerHTML = '';

    appData.drills.forEach(drill => {
        const drillCard = document.createElement('div');
        drillCard.className = 'drill-card';
        drillCard.innerHTML = `
            <div class="drill-header">
                <div class="drill-icon">
                    <i class="${drill.icon}"></i>
                </div>
                <h3 class="drill-card-title">${drill.title}</h3>
            </div>
            <p class="drill-description">${drill.description}</p>
            <div class="drill-meta">
                <span>Duration: ${drill.duration}</span>
                <span class="status-badge ${drill.completed ? 'status-badge--completed' : 'status-badge--not-started'}">
                    ${drill.completed ? 'Completed' : 'Not Started'}
                </span>
            </div>
            <div class="drill-actions">
                <button class="btn btn--primary drill-start-btn" data-drill-id="${drill.id}">
                    ${drill.completed ? 'Retry Drill' : 'Start Drill'}
                </button>
            </div>
        `;
        
        // Add event listener to the start button
        const startButton = drillCard.querySelector('.drill-start-btn');
        startButton.addEventListener('click', function() {
            const drillId = this.getAttribute('data-drill-id');
            console.log('Starting drill:', drillId);
            startDrill(drillId);
        });
        
        drillsGrid.appendChild(drillCard);
    });
    
    console.log('Drills page rendered with', appData.drills.length, 'drills');
}

function renderAlertsPage() {
    const alertsList = document.getElementById('alerts-list');
    if (!alertsList) {
        console.log('Alerts list not found');
        return;
    }

    alertsList.innerHTML = '';

    if (appData.alerts.length === 0) {
        alertsList.innerHTML = '<div class="empty-state"><p>No active alerts in your region.</p></div>';
        return;
    }

    appData.alerts.forEach(alert => {
        const alertCard = document.createElement('div');
        alertCard.className = `alert-card alert-card--${alert.severity.toLowerCase()}`;
        alertCard.innerHTML = `
            <div class="alert-header">
                <div class="alert-card-icon">
                    <i class="${alert.icon}"></i>
                </div>
                <div class="alert-info">
                    <div class="alert-type">${alert.type}</div>
                    <h3 class="alert-card-title">${alert.title}</h3>
                    <div class="alert-time">${alert.time}</div>
                </div>
            </div>
            <p class="alert-card-message">${alert.message}</p>
        `;
        alertsList.appendChild(alertCard);
    });
    
    console.log('Alerts page rendered with', appData.alerts.length, 'alerts');
}

function renderContactsPage() {
    const contactsSection = document.getElementById('contacts-sections');
    if (!contactsSection) {
        console.log('Contacts section not found');
        return;
    }

    contactsSection.innerHTML = '';

    const sections = [
        { key: 'emergency', title: 'Emergency Services', subtitle: 'Critical emergency contacts' },
        { key: 'medical', title: 'Medical Services', subtitle: 'Health and medical assistance' },
        { key: 'campus', title: 'Campus Services', subtitle: 'University support services' }
    ];

    sections.forEach(section => {
        const contacts = appData.contacts[section.key] || [];
        
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'contacts-section';
        sectionDiv.innerHTML = `
            <div class="section-header">
                <h3 class="section-title">${section.title}</h3>
                <p class="section-subtitle">${section.subtitle}</p>
            </div>
            <div class="contacts-list">
                ${contacts.map(contact => `
                    <div class="contact-card">
                        <div class="contact-header">
                            <div class="contact-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <h4 class="contact-name">${contact.name}</h4>
                        </div>
                        <div class="contact-number">${contact.number}</div>
                        <div class="contact-description">${contact.desc}</div>
                    </div>
                `).join('')}
            </div>
        `;
        contactsSection.appendChild(sectionDiv);
    });
    
    console.log('Contacts page rendered');
}

function renderDashboardProgress() {
    const modulesProgressList = document.getElementById('modules-progress-list');
    if (!modulesProgressList) return;

    modulesProgressList.innerHTML = '';

    appData.modules.forEach(module => {
        const moduleItem = document.createElement('div');
        moduleItem.className = 'module-item';
        moduleItem.innerHTML = `
            <div class="module-info">
                <h4 class="module-title">${module.title}</h4>
                <span class="module-status">${module.status}</span>
            </div>
            <div class="module-progress-bar">
                <div class="progress-fill" style="width: ${module.progress}%"></div>
            </div>
        `;
        modulesProgressList.appendChild(moduleItem);
    });
}

function renderRecentActivity() {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;

    activityList.innerHTML = '';

    appData.activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-details">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.description}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

// Module functionality
function startModule(moduleId) {
    console.log('Starting module function for:', moduleId);
    const module = appData.modules.find(m => m.id === moduleId);
    if (!module) {
        console.error('Module not found:', moduleId);
        return;
    }

    showNotification(`Starting ${module.title}...`, 'info');
    
    // Simulate module progress
    setTimeout(() => {
        if (module.progress === 0) {
            module.progress = 25;
            module.status = 'In Progress';
            addActivity(`Started ${module.title}`, 'You began learning about disaster preparedness', 'fas fa-play');
        } else {
            module.progress = Math.min(100, module.progress + 25);
            if (module.progress === 100) {
                module.status = 'Completed';
                userProgress.modulesCompleted++;
                userProgress.badgesEarned++;
                addActivity(`Completed ${module.title}`, 'Congratulations! You earned a completion badge', 'fas fa-medal');
                showNotification(`Congratulations! You completed ${module.title}!`, 'success');
            } else {
                addActivity(`Progress in ${module.title}`, `You've completed ${module.progress}% of the module`, 'fas fa-chart-line');
            }
        }
        
        updateDashboardMetrics();
        renderModulesPage();
        renderDashboardProgress();
        renderRecentActivity();
        
        if (module.progress < 100) {
            showNotification(`Progress updated: ${module.progress}% complete`, 'success');
        }
    }, 1000);
}

// Drill functionality
function startDrill(drillId) {
    console.log('Starting drill function for:', drillId);
    const drill = appData.drills.find(d => d.id === drillId);
    if (!drill) {
        console.error('Drill not found:', drillId);
        return;
    }

    showDrillModal(drill);
}

function showDrillModal(drill) {
    const modal = document.getElementById('drill-modal');
    const modalTitle = document.getElementById('drill-modal-title');
    const modalBody = document.getElementById('drill-modal-body');

    if (!modal || !modalTitle || !modalBody) {
        console.error('Modal elements not found');
        return;
    }

    modalTitle.textContent = drill.title;
    
    // Create drill scenario based on type
    let scenario = '';
    let questions = [];

    if (drill.id === 'earthquake-drill') {
        scenario = 'You are in your dormitory room when you suddenly feel the ground shaking. What should you do?';
        questions = [
            {
                question: 'What is the first action you should take during an earthquake?',
                options: ['Run outside immediately', 'Drop, Cover, and Hold On', 'Stand in a doorway', 'Call for help'],
                correct: 1
            },
            {
                question: 'Where is the safest place to take cover?',
                options: ['Under a sturdy desk or table', 'Near a window', 'In an elevator', 'On stairs'],
                correct: 0
            }
        ];
    } else if (drill.id === 'fire-drill') {
        scenario = 'You smell smoke in the hallway and hear the fire alarm. What steps should you take?';
        questions = [
            {
                question: 'When you hear a fire alarm, you should:',
                options: ['Investigate the source first', 'Evacuate immediately', 'Wait for instructions', 'Pack your belongings'],
                correct: 1
            },
            {
                question: 'If you encounter smoke while evacuating:',
                options: ['Stand upright and walk quickly', 'Stay low and crawl if necessary', 'Hold your breath and run', 'Turn back and find another route'],
                correct: 1
            }
        ];
    } else if (drill.id === 'flood-drill') {
        scenario = 'Heavy rains have caused flooding in your area. Emergency services have issued an evacuation notice.';
        questions = [
            {
                question: 'During a flood evacuation, you should:',
                options: ['Drive through flooded roads', 'Wait until water recedes', 'Follow evacuation routes', 'Stay on upper floors'],
                correct: 2
            },
            {
                question: 'How much water can knock you down?',
                options: ['12 inches', '6 inches', '3 inches', '18 inches'],
                correct: 1
            }
        ];
    }

    modalBody.innerHTML = `
        <div class="drill-scenario">
            <h4>Scenario</h4>
            <p>${scenario}</p>
        </div>
        <div class="drill-questions" id="drill-questions">
            ${questions.map((q, index) => `
                <div class="drill-question" data-question="${index}" data-correct="${q.correct}">
                    <h5>Question ${index + 1}: ${q.question}</h5>
                    <div class="drill-options">
                        ${q.options.map((option, optIndex) => `
                            <label class="drill-option">
                                <input type="radio" name="question-${index}" value="${optIndex}">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="drill-actions">
            <button class="btn btn--primary" id="submit-drill-btn" data-drill-id="${drill.id}">Submit Answers</button>
            <button class="btn btn--secondary" id="cancel-drill-btn">Cancel</button>
        </div>
    `;

    // Add event listeners to modal buttons
    const submitButton = modalBody.querySelector('#submit-drill-btn');
    const cancelButton = modalBody.querySelector('#cancel-drill-btn');
    
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const drillId = this.getAttribute('data-drill-id');
            submitDrill(drillId);
        });
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', closeDrillModal);
    }

    modal.classList.remove('hidden');
    console.log('Drill modal shown for:', drill.title);
}

function submitDrill(drillId) {
    console.log('Submitting drill:', drillId);
    
    const drill = appData.drills.find(d => d.id === drillId);
    if (!drill) {
        console.error('Drill not found for submission:', drillId);
        return;
    }
    
    const questions = document.querySelectorAll('.drill-question');
    let correctAnswers = 0;
    let totalQuestions = questions.length;

    questions.forEach((questionEl) => {
        const selectedOption = questionEl.querySelector('input[type="radio"]:checked');
        const correctAnswer = parseInt(questionEl.getAttribute('data-correct'));
        
        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            if (selectedValue === correctAnswer) {
                correctAnswers++;
            }
        }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update drill completion
    drill.completed = true;
    userProgress.drillsCompleted++;
    
    if (score >= 80) {
        userProgress.badgesEarned++;
        addActivity(`Completed ${drill.title}`, `Excellent work! You scored ${score}% and earned a badge`, 'fas fa-trophy');
        showNotification(`Drill completed! Score: ${score}% - Badge earned!`, 'success');
    } else {
        addActivity(`Completed ${drill.title}`, `You scored ${score}%. Consider reviewing the material`, 'fas fa-clipboard-check');
        showNotification(`Drill completed! Score: ${score}%`, 'info');
    }

    updateDashboardMetrics();
    renderDrillsPage();
    renderRecentActivity();
    closeDrillModal();
}

function closeDrillModal() {
    console.log('Closing drill modal');
    const modal = document.getElementById('drill-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Settings functionality
function initializeSettingsHandlers() {
    // Settings buttons will be handled by event delegation since they're rendered dynamically
    document.addEventListener('click', function(e) {
        if (e.target.matches('#settings-page .btn')) {
            const buttonText = e.target.textContent.trim();
            console.log('Settings button clicked:', buttonText);
            
            if (buttonText === 'Update Profile') {
                showNotification('Profile information updated!', 'success');
                addActivity('Profile Updated', 'Your profile information has been saved', 'fas fa-user-edit');
                renderRecentActivity();
            } else if (buttonText === 'Save Preferences') {
                showNotification('Notification preferences saved!', 'success');
                addActivity('Preferences Updated', 'Your notification settings have been saved', 'fas fa-cog');
                renderRecentActivity();
            } else if (buttonText === 'Export Progress') {
                showNotification('Progress data exported successfully!', 'info');
                addActivity('Data Exported', 'Your learning progress has been exported', 'fas fa-download');
                renderRecentActivity();
            } else if (buttonText === 'Reset All Progress') {
                if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
                    resetAllProgress();
                }
            }
        }
    });
}

function resetAllProgress() {
    console.log('Resetting all progress');
    
    // Reset modules
    appData.modules.forEach(module => {
        module.progress = 0;
        module.status = 'Not Started';
    });

    // Reset drills
    appData.drills.forEach(drill => {
        drill.completed = false;
    });

    // Reset user progress
    userProgress = {
        modulesCompleted: 0,
        drillsCompleted: 0,
        preparednessScore: 0,
        badgesEarned: 0,
        classRank: '#-'
    };

    // Add activity
    addActivity('Progress Reset', 'All learning progress has been reset', 'fas fa-refresh');

    // Update displays
    updateDashboardMetrics();
    renderAllPages();
    
    showNotification('All progress has been reset!', 'warning');
}

// Utility functions
function updateDashboardMetrics() {
    // Update preparedness score based on progress
    let totalProgress = 0;
    appData.modules.forEach(module => {
        totalProgress += module.progress;
    });
    const drillBonus = userProgress.drillsCompleted * 10;
    userProgress.preparednessScore = Math.min(100, Math.round(totalProgress / 3) + drillBonus);

    // Update overall progress
    const overallProgress = Math.round(totalProgress / 3);
    
    // Update DOM elements
    const preparednessElement = document.getElementById('preparedness-score');
    const modulesElement = document.getElementById('modules-completed');
    const badgesElement = document.getElementById('badges-earned');
    const rankElement = document.getElementById('class-rank');
    const overallElement = document.getElementById('overall-progress');
    const overallFill = document.getElementById('overall-progress-fill');
    const modulesStatus = document.getElementById('modules-status');
    const drillsStatus = document.getElementById('drills-status');

    if (preparednessElement) preparednessElement.textContent = userProgress.preparednessScore;
    if (modulesElement) modulesElement.textContent = `${userProgress.modulesCompleted}/3`;
    if (badgesElement) badgesElement.textContent = userProgress.badgesEarned;
    if (rankElement) rankElement.textContent = userProgress.classRank;
    if (overallElement) overallElement.textContent = `${overallProgress}%`;
    if (overallFill) overallFill.style.width = `${overallProgress}%`;
    if (modulesStatus) modulesStatus.textContent = `${userProgress.modulesCompleted}/3 completed`;
    if (drillsStatus) drillsStatus.textContent = `${userProgress.drillsCompleted} drills completed`;
}

function getStatusClass(status) {
    switch (status) {
        case 'Completed':
            return 'completed';
        case 'In Progress':
            return 'in-progress';
        default:
            return 'not-started';
    }
}

function addActivity(title, description, icon) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const activity = {
        title: title,
        description: description,
        time: `Today, ${timeString}`,
        icon: icon,
        type: 'info'
    };

    appData.activities.unshift(activity);
    
    // Keep only last 10 activities
    if (appData.activities.length > 10) {
        appData.activities = appData.activities.slice(0, 10);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-toast--${type}`;
    
    const colors = {
        'info': '#4a90e2',
        'success': '#4caf50',
        'warning': '#f59e0b',
        'error': '#ef4444'
    };

    const icons = {
        'info': 'fa-info-circle',
        'success': 'fa-check-circle',
        'warning': 'fa-exclamation-triangle',
        'error': 'fa-exclamation-circle'
    };

    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type]}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        max-width: 400px;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-left: 4px solid ${colors[type]};
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 16px;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto close
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 300);
}

function showNotificationPanel() {
    const recentAlerts = appData.alerts.slice(0, 2);
    let alertsHtml = '<div style="font-weight: 600; font-size: 16px; margin-bottom: 16px; color: #1f2937;">Recent Notifications</div>';
    
    recentAlerts.forEach(alert => {
        alertsHtml += `
            <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-weight: 600; color: #1f2937;">${alert.title}</span>
                    <span style="font-size: 12px; color: #6b7280;">${alert.time}</span>
                </div>
                <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.4;">${alert.message}</p>
            </div>
        `;
    });

    // Create a custom notification for the panel
    const notification = document.createElement('div');
    notification.className = 'notification-panel';
    notification.innerHTML = alertsHtml;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        width: 400px;
        max-width: 90vw;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        padding: 24px;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Close on click outside
    setTimeout(() => {
        const clickHandler = (e) => {
            if (!notification.contains(e.target)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
                document.removeEventListener('click', clickHandler);
            }
        };
        document.addEventListener('click', clickHandler);
    }, 100);

    // Auto close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 10000);
}

function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('Welcome to DisasterEd! Start your disaster preparedness journey today.', 'success');
    }, 1000);
}