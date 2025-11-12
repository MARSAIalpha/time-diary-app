// 时光日记应用主要逻辑
class TimeDiary {
    constructor() {
        this.diaryData = this.loadData();
        this.currentDiary = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
    }

    // 数据存储和加载
    loadData() {
        const data = localStorage.getItem('timeDiaryData');
        return data ? JSON.parse(data) : [];
    }

    saveData() {
        localStorage.setItem('timeDiaryData', JSON.stringify(this.diaryData));
    }

    // 加载示例数据
    loadSampleData() {
        if (this.diaryData.length === 0) {
            const sampleData = [
                {
                    id: this.generateId(),
                    title: "美好的早晨",
                    content: "今天是一个阳光明媚的早晨，我在公园里散步，看到了许多美丽的花朵和可爱的小动物。心情格外愉快，决定开始记录这美好的一天。",
                    date: "2025-11-12",
                    time: "08:30",
                    mood: "happy",
                    tags: ["生活", "自然", "健康"],
                    images: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    title: "工作感悟",
                    content: "今天在工作中遇到了一些挑战，但是通过团队的合作我们成功解决了问题。这让我深刻体会到团队协作的重要性，每个人都在为共同的目标而努力。",
                    date: "2025-11-11",
                    time: "18:45",
                    mood: "calm",
                    tags: ["工作", "团队", "成长"],
                    images: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    title: "学习新技能",
                    content: "今天开始学习新的编程技能，虽然刚开始有些困难，但是通过不断练习和查阅资料，慢慢掌握了基本的用法。学习新东西总是让人感到充实和满足。",
                    date: "2025-11-10",
                    time: "21:15",
                    mood: "excited",
                    tags: ["学习", "技术", "进步"],
                    images: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    title: "朋友聚会",
                    content: "和多年未见的老朋友重聚，大家一起回忆过去的点点滴滴，分享各自的生活经历。时间虽然改变了我们的容颜，但友谊依然如昔。",
                    date: "2025-11-09",
                    time: "19:30",
                    mood: "happy",
                    tags: ["友谊", "聚会", "回忆"],
                    images: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    title: "静夜思考",
                    content: "夜深人静的时候，总喜欢思考人生和未来。回顾过去的日子，有欢笑也有泪水，但每一步都让我成长为今天的自己。对未来充满期待。",
                    date: "2025-11-08",
                    time: "23:20",
                    mood: "calm",
                    tags: ["思考", "人生", "成长"],
                    images: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];
            this.diaryData = sampleData;
            this.saveData();
            console.log('示例数据已加载:', this.diaryData.length, '条日记');
        } else {
            console.log('已有数据:', this.diaryData.length, '条日记');
        }
    }

    // 生成唯一ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 获取心情图标
    getMoodIcon(mood) {
        const moodIcons = {
            happy: '😊',
            sad: '😢',
            angry: '😠',
            excited: '🤩',
            calm: '😌',
            tired: '😴'
        };
        return moodIcons[mood] || '😐';
    }

    // 获取心情颜色
    getMoodColor(mood) {
        const moodColors = {
            happy: 'bg-yellow-100 border-yellow-300',
            sad: 'bg-blue-100 border-blue-300',
            angry: 'bg-red-100 border-red-300',
            excited: 'bg-orange-100 border-orange-300',
            calm: 'bg-green-100 border-green-300',
            tired: 'bg-purple-100 border-purple-300'
        };
        return moodColors[mood] || 'bg-gray-100 border-gray-300';
    }

    // 时间轴相关方法
    renderTimeline() {
        const timelineContainer = document.getElementById('timeline-container');
        if (!timelineContainer) {
            console.log('时间轴容器未找到');
            return;
        }

        console.log('开始渲染时间轴，数据条数:', this.diaryData.length);

        const sortedDiaries = this.diaryData.sort((a, b) => 
            new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time)
        );

        timelineContainer.innerHTML = '';

        if (sortedDiaries.length === 0) {
            timelineContainer.innerHTML = `
                <div class="text-center py-12">
                    <div class="text-gray-400 mb-4">
                        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">还没有日记记录</h3>
                    <p class="text-white text-opacity-75 mb-4">开始记录您的美好时光吧！</p>
                    <a href="editor.html" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block">
                        写第一篇日记
                    </a>
                </div>
            `;
            return;
        }

        sortedDiaries.forEach((diary, index) => {
            const diaryCard = this.createTimelineCard(diary, index);
            timelineContainer.appendChild(diaryCard);
        });

        this.setupTimelineScroll();
    }

    createTimelineCard(diary, index) {
        const card = document.createElement('div');
        card.className = `timeline-item opacity-0 transform translate-y-8 transition-all duration-500 timeline-right`;
        card.dataset.diaryId = diary.id;
        
        const moodColor = this.getMoodColor(diary.mood);
        const moodIcon = this.getMoodIcon(diary.mood);
        
        card.innerHTML = `
            <div class="timeline-dot ${moodColor.replace('bg-', 'bg-').replace('-100', '-500')}"></div>
            <div class="timeline-card ${moodColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
                
                <!-- 时间区域 - 独立放大显示 -->
                <div class="flex items-center justify-between mb-4">
                    <div class="text-left">
                        <div class="text-2xl font-bold text-gray-800">${diary.time}</div>
                        <div class="text-sm text-gray-600">${this.formatDate(diary.date)}</div>
                    </div>
                    <div class="text-right">
                        <span class="text-lg opacity-60">${moodIcon}</span>
                    </div>
                </div>
                
                ${diary.images.length > 0 ? `
                    <div class="mb-4">
                        <div class="flex -space-x-2">
                            ${diary.images.slice(0, 3).map((image, imgIndex) => `
                                <div class="w-16 h-16 rounded-lg border-2 border-white overflow-hidden shadow-md ${imgIndex > 0 ? 'opacity-80' : ''}">
                                    <img src="${image.src}" alt="${image.name}" class="w-full h-full object-cover">
                                </div>
                            `).join('')}
                            ${diary.images.length > 3 ? `
                                <div class="w-16 h-16 rounded-lg border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shadow-md">
                                    +${diary.images.length - 3}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
                
                <h3 class="text-xl font-bold text-gray-800 mb-3">${diary.title}</h3>
                <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">${diary.content}</p>
                ${diary.tags.length > 0 ? `
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${diary.tags.map(tag => `
                            <span class="px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs text-gray-700 font-medium">${tag}</span>
                        `).join('')}
                    </div>
                ` : ''}
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span class="font-medium">点击查看详情</span>
                    <span class="bg-white bg-opacity-50 px-2 py-1 rounded-full">${diary.images.length} 张图片</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => this.openDiaryEditor(diary.id));
        
        return card;
    }

    setupTimelineScroll() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.remove('opacity-0', 'translate-y-8');
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => observer.observe(item));
    }

    // 日历相关方法
    renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonth = document.getElementById('current-month');
        
        if (!calendarGrid || !currentMonth) return;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        
        currentMonth.textContent = `${year}年${month + 1}月`;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        calendarGrid.innerHTML = '';
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dateStr = date.toISOString().split('T')[0];
            const hasDiary = this.diaryData.some(diary => diary.date === dateStr);
            
            const dayElement = document.createElement('div');
            dayElement.className = `calendar-day ${date.getMonth() !== month ? 'text-gray-300' : 'text-gray-700'} ${hasDiary ? 'has-diary' : ''} hover:bg-blue-50 cursor-pointer transition-colors duration-200`;
            dayElement.textContent = date.getDate();
            
            if (hasDiary) {
                const indicator = document.createElement('div');
                indicator.className = 'w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1';
                dayElement.appendChild(indicator);
            }
            
            dayElement.addEventListener('click', () => {
                if (date.getMonth() === month) {
                    this.openDiaryEditor(null, dateStr);
                }
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }

    // 编辑器相关方法
    openDiaryEditor(diaryId = null, date = null) {
        if (diaryId) {
            window.location.href = `editor.html?id=${diaryId}`;
        } else {
            const dateParam = date ? `&date=${date}` : '';
            window.location.href = `editor.html?new=true${dateParam}`;
        }
    }

    loadDiaryForEdit() {
        const urlParams = new URLSearchParams(window.location.search);
        const diaryId = urlParams.get('id');
        const isNew = urlParams.get('new');
        const date = urlParams.get('date');
        
        if (diaryId) {
            const diary = this.diaryData.find(d => d.id === diaryId);
            if (diary) {
                this.currentDiary = diary;
                this.populateEditor(diary);
            }
        } else if (isNew) {
            this.currentDiary = {
                id: this.generateId(),
                title: '',
                content: '',
                date: date || new Date().toISOString().split('T')[0],
                time: new Date().toTimeString().substr(0, 5),
                mood: 'calm',
                tags: [],
                images: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.populateEditor(this.currentDiary);
        }
    }

    populateEditor(diary) {
        const titleInput = document.getElementById('diary-title');
        const contentTextarea = document.getElementById('diary-content');
        const dateInput = document.getElementById('diary-date');
        const timeInput = document.getElementById('diary-time');
        
        if (titleInput) titleInput.value = diary.title;
        if (contentTextarea) contentTextarea.value = diary.content;
        if (dateInput) dateInput.value = diary.date;
        if (timeInput) timeInput.value = diary.time;
        
        // 设置心情选择
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.mood === diary.mood) {
                btn.classList.add('selected');
            }
        });
        
        // 渲染标签
        this.renderTags(diary.tags);
        
        // 渲染图片
        this.renderImages(diary.images);
    }

    renderTags(tags) {
        const tagsContainer = document.getElementById('tags-container');
        if (!tagsContainer) return;
        
        tagsContainer.innerHTML = '';
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 mr-2 mb-2';
            tagElement.innerHTML = `
                ${tag}
                <button class="ml-2 text-blue-600 hover:text-blue-800" onclick="timeDiary.removeTag('${tag}')">×</button>
            `;
            tagsContainer.appendChild(tagElement);
        });
    }

    renderImages(images) {
        const imagesContainer = document.getElementById('images-container');
        if (!imagesContainer) return;
        
        imagesContainer.innerHTML = '';
        images.forEach((image, index) => {
            const imageElement = document.createElement('div');
            imageElement.className = 'relative group';
            imageElement.innerHTML = `
                <img src="${image.src}" alt="${image.name}" class="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity">
                <button class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onclick="timeDiary.removeImage(${index})">×</button>
            `;
            imagesContainer.appendChild(imageElement);
        });
    }

    // 保存日记
    saveDiary() {
        if (!this.currentDiary) return;
        
        const title = document.getElementById('diary-title').value;
        const content = document.getElementById('diary-content').value;
        const date = document.getElementById('diary-date').value;
        const time = document.getElementById('diary-time').value;
        
        this.currentDiary.title = title;
        this.currentDiary.content = content;
        this.currentDiary.date = date;
        this.currentDiary.time = time;
        this.currentDiary.updatedAt = new Date().toISOString();
        
        const existingIndex = this.diaryData.findIndex(d => d.id === this.currentDiary.id);
        if (existingIndex >= 0) {
            this.diaryData[existingIndex] = this.currentDiary;
        } else {
            this.diaryData.push(this.currentDiary);
        }
        
        this.saveData();
        this.showNotification('日记保存成功！');
        
        // 保存后自动跳转到时间轴
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    // 删除日记
    deleteDiary() {
        if (!this.currentDiary) return;
        
        if (confirm('确定要删除这篇日记吗？')) {
            this.diaryData = this.diaryData.filter(d => d.id !== this.currentDiary.id);
            this.saveData();
            window.location.href = 'index.html';
        }
    }

    // 标签管理
    addTag() {
        const tagInput = document.getElementById('tag-input');
        const tag = tagInput.value.trim();
        
        if (tag && this.currentDiary && this.currentDiary.tags.length < 5) {
            if (!this.currentDiary.tags.includes(tag)) {
                this.currentDiary.tags.push(tag);
                this.renderTags(this.currentDiary.tags);
                tagInput.value = '';
            }
        }
    }

    removeTag(tagToRemove) {
        if (this.currentDiary) {
            this.currentDiary.tags = this.currentDiary.tags.filter(tag => tag !== tagToRemove);
            this.renderTags(this.currentDiary.tags);
        }
    }

    // 图片管理
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                this.showNotification('图片大小不能超过5MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = {
                    id: this.generateId(),
                    src: e.target.result,
                    name: file.name
                };
                
                if (this.currentDiary) {
                    this.currentDiary.images.push(image);
                    this.renderImages(this.currentDiary.images);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage(index) {
        if (this.currentDiary && confirm('确定要删除这张图片吗？')) {
            this.currentDiary.images.splice(index, 1);
            this.renderImages(this.currentDiary.images);
        }
    }

    // 心情选择
    selectMood(mood) {
        if (this.currentDiary) {
            this.currentDiary.mood = mood;
            
            const moodButtons = document.querySelectorAll('.mood-btn');
            moodButtons.forEach(btn => {
                btn.classList.remove('selected');
                if (btn.dataset.mood === mood) {
                    btn.classList.add('selected');
                }
            });
        }
    }

    // 统计和图表
    generateSummary() {
        const summary = {
            totalDiaries: this.diaryData.length,
            moodDistribution: {},
            tagFrequency: {},
            weeklyStats: {},
            totalWords: 0,
            weeklySummary: this.generateWeeklySummary()
        };

        this.diaryData.forEach(diary => {
            // 心情分布
            summary.moodDistribution[diary.mood] = (summary.moodDistribution[diary.mood] || 0) + 1;
            
            // 标签频率
            diary.tags.forEach(tag => {
                summary.tagFrequency[tag] = (summary.tagFrequency[tag] || 0) + 1;
            });
            
            // 字数统计
            summary.totalWords += diary.content.length;
            
            // 周统计
            const week = this.getWeekNumber(diary.date);
            summary.weeklyStats[week] = (summary.weeklyStats[week] || 0) + 1;
        });

        return summary;
    }

    // 生成智能一周总结
    generateWeeklySummary() {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);
        
        const thisWeekDiaries = this.diaryData.filter(diary => {
            const diaryDate = new Date(diary.date);
            return diaryDate >= startOfWeek;
        });

        if (thisWeekDiaries.length === 0) {
            return {
                activities: [],
                feelings: [],
                achievements: [],
                nextWeekGoals: []
            };
        }

        // 分析活动内容
        const activities = this.extractActivities(thisWeekDiaries);
        const feelings = this.extractFeelings(thisWeekDiaries);
        const achievements = this.extractAchievements(thisWeekDiaries);
        const nextWeekGoals = this.generateNextWeekGoals(thisWeekDiaries);

        return {
            activities,
            feelings,
            achievements,
            nextWeekGoals,
            summaryText: this.generateSummaryText(thisWeekDiaries, activities, feelings, achievements)
        };
    }

    // 提取活动信息
    extractActivities(diaries) {
        const activities = [];
        const activityKeywords = {
            '读书': ['书', '阅读', '看书', '读书', '学习'],
            '运动': ['跑步', '健身', '运动', '锻炼', '瑜伽', '游泳'],
            '旅行': ['旅行', '旅游', '出差', '去了', '到达'],
            '工作': ['工作', '项目', '会议', '任务', '完成'],
            '社交': ['朋友', '聚会', '见面', '聊天', '聚餐'],
            '娱乐': ['电影', '音乐', '游戏', '看剧', '放松']
        };

        diaries.forEach(diary => {
            Object.entries(activityKeywords).forEach(([activity, keywords]) => {
                if (keywords.some(keyword => diary.content.includes(keyword))) {
                    if (!activities.includes(activity)) {
                        activities.push(activity);
                    }
                }
            });
        });

        return activities;
    }

    // 提取主要感想
    extractFeelings(diaries) {
        const feelings = [];
        const feelingKeywords = {
            '开心': ['开心', '快乐', '高兴', '愉快', '兴奋'],
            '满足': ['满足', '充实', '满意', '成就感', '幸福'],
            '疲惫': ['累', '疲惫', '疲倦', '困', '疲劳'],
            '焦虑': ['焦虑', '担心', '紧张', '压力', '不安'],
            '平静': ['平静', '安静', '放松', '舒适', '惬意']
        };

        diaries.forEach(diary => {
            Object.entries(feelingKeywords).forEach(([feeling, keywords]) => {
                if (keywords.some(keyword => diary.content.includes(keyword))) {
                    if (!feelings.includes(feeling)) {
                        feelings.push(feeling);
                    }
                }
            });
        });

        return feelings;
    }

    // 提取完成的事情
    extractAchievements(diaries) {
        const achievements = [];
        const achievementKeywords = {
            '完成目标': ['完成', '达成', '实现', '成功', '做好'],
            '学习进步': ['学会', '掌握', '理解', '进步', '提高'],
            '突破挑战': ['克服', '战胜', '解决', '突破', '挑战'],
            '获得认可': ['表扬', '认可', '赞赏', '肯定', '夸奖']
        };

        diaries.forEach(diary => {
            Object.entries(achievementKeywords).forEach(([achievement, keywords]) => {
                if (keywords.some(keyword => diary.content.includes(keyword))) {
                    if (!achievements.includes(achievement)) {
                        achievements.push(achievement);
                    }
                }
            });
        });

        return achievements;
    }

    // 生成下周目标
    generateNextWeekGoals(diaries) {
        const goals = [];
        const goalKeywords = {
            '继续学习': ['学习', '读书', '提升', '进步'],
            '保持健康': ['健康', '运动', '锻炼', '养生'],
            '工作进步': ['工作', '项目', '任务', '效率'],
            '人际关系': ['朋友', '家人', '沟通', '联系'],
            '自我提升': ['习惯', '自律', '时间管理', '目标']
        };

        diaries.forEach(diary => {
            Object.entries(goalKeywords).forEach(([goal, keywords]) => {
                if (keywords.some(keyword => diary.content.includes(keyword))) {
                    if (!goals.includes(goal) && goals.length < 4) {
                        goals.push(goal);
                    }
                }
            });
        });

        // 如果目标太少，添加一些默认目标
        if (goals.length < 3) {
            const defaultGoals = ['保持积极心态', '规律作息', '坚持运动'];
            defaultGoals.forEach(goal => {
                if (!goals.includes(goal) && goals.length < 3) {
                    goals.push(goal);
                }
            });
        }

        return goals;
    }

    // 生成总结文本
    generateSummaryText(diaries, activities, feelings, achievements) {
        const diaryCount = diaries.length;
        const avgMood = this.calculateAverageMood(diaries);
        
        let summary = `本周共记录了${diaryCount}篇日记，`;
        
        if (activities.length > 0) {
            summary += `主要活动包括${activities.join('、')}，`;
        }
        
        if (feelings.length > 0) {
            summary += `整体心情以${feelings.join('、')}为主，`;
        }
        
        if (achievements.length > 0) {
            summary += `取得了${achievements.join('、')}等方面的进步。`;
        }
        
        return summary;
    }

    // 计算平均心情
    calculateAverageMood(diaries) {
        const moodScores = {
            happy: 5,
            excited: 4,
            calm: 3,
            tired: 2,
            sad: 1,
            angry: 0
        };
        
        const totalScore = diaries.reduce((sum, diary) => {
            return sum + (moodScores[diary.mood] || 3);
        }, 0);
        
        return Math.round(totalScore / diaries.length);
    }

    // 工具方法
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    }

    getWeekNumber(dateStr) {
        const date = new Date(dateStr);
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - startOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white transform translate-x-full transition-transform duration-300`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    setupEventListeners() {
        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                const timelineItems = document.querySelectorAll('.timeline-item');
                if (timelineItems.length > 0) {
                    e.preventDefault();
                    // 实现键盘导航逻辑
                }
            }
        });

        // 自动保存
        setInterval(() => {
            if (this.currentDiary && window.location.pathname.includes('editor.html')) {
                this.saveDiary();
            }
        }, 30000);

        // 移动端菜单点击外部关闭
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
            
            if (mobileMenu && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // 添加移动端菜单样式
        this.addMobileMenuStyles();
    }

    addMobileMenuStyles() {
        // 检查是否已添加样式
        if (document.getElementById('mobile-menu-styles')) return;

        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = `
            .mobile-menu {
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            
            .mobile-menu a {
                color: #374151 !important;
                font-weight: 500;
                transition: all 0.3s ease;
                border-radius: 0.5rem;
                margin: 0.25rem 0;
            }
            
            .mobile-menu a:hover {
                background: rgba(59, 130, 246, 0.1);
                color: #3b82f6 !important;
                transform: translateX(4px);
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化应用
let timeDiary;

document.addEventListener('DOMContentLoaded', () => {
    timeDiary = new TimeDiary();
    
    // 根据页面加载相应功能
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        timeDiary.renderTimeline();
    } else if (window.location.pathname.includes('calendar.html')) {
        timeDiary.renderCalendar();
    } else if (window.location.pathname.includes('editor.html')) {
        timeDiary.loadDiaryForEdit();
    } else if (window.location.pathname.includes('summary.html')) {
        renderSummary();
    }
});

// 全局函数供HTML调用
function saveDiary() {
    if (timeDiary) timeDiary.saveDiary();
}

function deleteDiary() {
    if (timeDiary) timeDiary.deleteDiary();
}

function addTag() {
    if (timeDiary) timeDiary.addTag();
}

function removeTag(tag) {
    if (timeDiary) timeDiary.removeTag(tag);
}

function selectMood(mood) {
    if (timeDiary) timeDiary.selectMood(mood);
}

function handleImageUpload(event) {
    if (timeDiary) timeDiary.handleImageUpload(event);
}

function removeImage(index) {
    if (timeDiary) timeDiary.removeImage(index);
}

// 移动端菜单切换
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}