// --- Data Persistence ---
function saveData() {
    try {
        localStorage.setItem('travel_sharedResponses', JSON.stringify(sharedResponses));
        localStorage.setItem('travel_participation', JSON.stringify(participation));
    } catch (e) {
        console.error("저장에 실패했습니다.", e);
    }
}

function loadData() {
    try {
        const savedResponses = localStorage.getItem('travel_sharedResponses');
        const savedParticipation = localStorage.getItem('travel_participation');
        if (savedResponses) sharedResponses = JSON.parse(savedResponses);
        if (savedParticipation) participation = JSON.parse(savedParticipation);
    } catch (e) {
        console.error("데이터 로드 중 오류 발생", e);
    }
}

const lessonData = {
    1: {
        title: "1차시: 여행에서 만난 나",
        desc: "우리는 왜 여행을 떠날까요? 여행의 첫걸음을 떼어봅니다.",
        steps: [
            { id: "1-1", icon: "🌍", title: "1. 나에게 여행이란?", content: `<h3>브레인스토밍: 여행의 정의</h3><p>친구들이 생각하는 '여행'은 어떤 단어로 표현될까요?</p>`, isWordCloud: true },
            { id: "1-2", icon: "📸", title: "2. 인생 여행지 공유", content: `<h3>인생 여행 사진 공유</h3><div class="file-zone" id="drop-zone-1-2" ondragover="allowDrop(event)" ondrop="handleDrop(event, '1-2')"><p>📸 드래그하거나 클릭하여 업로드</p><input type="file" id="photo-input" style="display:none" onchange="handleFileSelect(event, '1-2')"></div>`, hideBoardInput: true, isPhotoGallery: true },
            { id: "1-3", icon: "📄", title: "3. 활동지 다운로드", content: `<div class="content-block"><h3>필수 활동지</h3><a href="여행에서_만난_나_1차시_활동지.pdf" class="download-link" onclick="handleTrackedDownload(event, '1-3')" download>⬇️ 1차시 활동지 다운로드</a></div>`, hideBoard: true },
            { id: "1-4", icon: "🎒", title: "4. 나의 가방 속 물건", content: `<h3>가방 필수템</h3><p>물건을 적어주세요. 많이 나오면 커집니다!</p>`, isWordCloud: true },
            { id: "1-5", icon: "💬", title: "5. 여행 목적 설문", content: `<h3>여행의 이유</h3><div class="quiz-options"><button class="quiz-btn" onclick="submitSurvey('1-5', '휴식')">휴식</button><button class="quiz-btn" onclick="submitSurvey('1-5', '모험')">모험</button><button class="quiz-btn" onclick="submitSurvey('1-5', '음식')">음식</button><button class="quiz-btn" onclick="submitSurvey('1-5', '역사')">역사</button><button class="quiz-btn" onclick="showOtherInput()">기타</button></div><div id="other-input-area" style="display:none; margin-top:10px;" class="input-group"><input type="text" id="survey-other" placeholder="기타..."><button class="back-btn" style="margin:0" onclick="submitSurvey('1-5', '기타')">확인</button></div>`, isGraphicOrganizer: true, hideBoardInput: true },
            { id: "1-6", icon: "🗺️", title: "6. 가보고 싶은 곳", content: `<h3>꿈꾸는 여행지</h3><p>지도를 보며 가고 싶은 곳의 링크를 공유해 주세요.</p><a href="https://maps.google.com" target="_blank" class="download-link" style="background:#4285F4">🌐 지도 열기</a>`, isMapLink: true },
            { id: "1-7", icon: "📤", title: "7. 과제 제출", content: `<h3>과제 업로드</h3><div class="file-zone" ondragover="allowDrop(event)" ondrop="handleDrop(event, '1-7')"><p>📂 드래그하여 업로드</p></div>`, isAssignmentList: true, hideBoardInput: true },
            { id: "1-8", icon: "💡", title: "8. 여행 상식 퀴즈", content: `<div id="quiz-init" class="input-group"><input type="text" id="student-quiz-name" placeholder="이름 입력"><button class="back-btn" style="margin:0" onclick="startQuizWithName()">시작</button></div><div id="quiz-area"></div>`, isQuiz: true, hideBoardInput: true },
            { id: "1-9", icon: "📅", title: "9. 1차시 마무리", content: `<h3>소감 나누기</h3><div class="input-group"><input type="text" id="sync-name" placeholder="이름" style="width:100px; flex:none;"><input type="text" id="sync-thought" placeholder="소감 입력 후 엔터" onkeypress="handleEnterSync(event, '1-9')"></div>`, isLiveSync: true, hideBoardInput: true },
            { id: "1-10", icon: "📈", title: "10. 참여 통계", content: `<h3>우리 반 참여 현황</h3>`, isStats: true, hideBoard: true }
        ]
    },
    2: {
        title: "2차시: 여행과 나의 성장",
        desc: "여행은 우리를 어떻게 변화시킬까요? 성장의 시간을 기록합니다.",
        steps: [
            { id: "2-1", icon: "🧩", title: "1. 여행 테마 정하기", content: "<h3>나만의 여행 테마</h3><p>내가 계획하고 싶은 여행 테마는 무엇인가요?</p>", isWordCloud: true },
            {
                id: "2-2", icon: "🚶", title: "2. 걷기 여행의 토론", content: `<h3>느리게 걷기 토론</h3><p>도보 여행의 특징을 장점과 단점으로 구분하여 적어봅시다.</p>
                <div class="input-group" style="background:#fff; border:1px solid #ddd;">
                    <input type="text" id="pc-name" placeholder="이름" style="width:80px; border:1px solid #ddd; padding:10px; border-radius:10px;">
                    <select id="pc-type" style="padding:10px; border-radius:10px; border:1px solid #ddd;">
                        <option value="장점">✅ 장점</option>
                        <option value="단점">❌ 단점</option>
                    </select>
                    <input type="text" id="pc-text" placeholder="의견을 입력하세요...">
                    <button class="back-btn" style="margin:0; background:var(--primary); color:white;" onclick="submitProsCons('2-2')">공유</button>
                </div>`, isProsCons: true, hideBoardInput: true
            },
            { id: "2-3", icon: "🚌", title: "3. 대중교통 이용", content: "<h3>현지 교통수단</h3><p>여행지에서 이용하고 싶은 교통수단을 적어주세요. 연결망으로 시각화됩니다.</p>", isNodeGraph: true },
            { id: "2-4", icon: "🍽️", title: "4. 현지 음식 문화", content: "<h3>맛의 모험</h3><p>가장 먹어보고 싶은 이색 음식은? 많이 나온 키워드가 크게 보입니다.</p>", isBubbleChart: true },
            { id: "2-5", icon: "📄", title: "5. 활동지 다운로드", content: `<div class="content-block"><h3>필수 활동지</h3><a href="여행에서_만난_나_활동지.pdf" class="download-link" onclick="handleTrackedDownload(event, '2-5')" download>⬇️ 2차시 활동지 다운로드</a></div>`, hideBoard: true },
            {
                id: "2-6", icon: "🎨", title: "6. 여행 일러스트", content: `<h3>그림으로 나누는 여행</h3><div class="canvas-wrapper"><canvas id="whiteboard" width="600" height="400"></canvas><div class="canvas-ctrl"><input type="color" id="get-pen-color" value="#4A90E2"><button class="back-btn" style="margin:0" onclick="clearCanvas()">지우기</button><button class="back-btn" style="margin:0; background:var(--primary); color:white;" onclick="postCanvas('2-6')">그림 공유</button></div></div>
                <div class="file-zone" ondragover="allowDrop(event)" ondrop="handleDrop(event, '2-6')"><p>🎨 그림 파일 업로드 (드래그)</p></div>`, isPhotoGallery: true, hideBoardInput: true
            },
            { id: "2-7", icon: "🎵", title: "7. 여행 플레이리스트", content: `<h3>유튜브 음악 공유</h3><p>추천하고 싶은 여행 음악의 유튜브 링크를 공유해 주세요.</p><a href="https://www.youtube.com" target="_blank" class="youtube-card">🎬 유튜브 바로가기</a>`, isPlaylist: true },
            { id: "2-8", icon: "📤", title: "8. 활동 결과 제출", content: `<h3>자료 업로드</h3><div class="file-zone" ondragover="allowDrop(event)" ondrop="handleDrop(event, '2-8')"><p>📁 파일을 드래그하여 제출</p></div>`, isAssignmentList: true, hideBoardInput: true },
            { id: "2-9", icon: "✨", title: "9. 성장의 한마디", content: `<h3>나의 다짐</h3><div class="input-group"><input type="text" id="sync-name" placeholder="이름" style="width:100px; flex:none;"><input type="text" id="sync-thought" placeholder="나의 다짐 입력 후 엔터" onkeypress="handleEnterSync(event, '2-9')"></div>`, isLiveSync: true, hideBoardInput: true },
            { id: "2-10", icon: "📈", title: "10. 참여 통계", content: `<h3>우리 반 참여 현황</h3>`, isStats: true, hideBoard: true }
        ]
    },
    3: {
        title: "3차시: 여행의 의미 발견",
        desc: "수업을 마무리하며 나만의 여행 의미를 정의합니다.",
        steps: [
            { id: "3-1", icon: "📕", title: "1. 발췌독 활동지", content: `<div class="content-block"><h3>최종 활동지</h3><a href="여행_발췌독_연계_활동지_3차시.pdf" class="download-link" onclick="handleTrackedDownload(event, '3-1')" download>⬇️ 3차시 활동지 다운로드</a></div>`, hideBoard: true },
            { id: "3-2", icon: "✍️", title: "2. 여행 에세이 쓰기", content: "<h3>나의 여행 이야기</h3><div class=\"input-group\"><input type=\"text\" id=\"sync-name\" placeholder=\"이름\" style=\"width:100px; flex:none;\"><input type=\"text\" id=\"sync-thought\" placeholder=\"짧은 에세이 입력 후 엔터\" onkeypress=\"handleEnterSync(event, '3-2')\"></div>", isLiveSync: true, hideBoardInput: true },
            { id: "3-3", icon: "🤝", title: "3. 모둠 여행 계획", content: "<h3>우리 팀의 계획</h3><p>함께 가고 싶은 도시들을 적어보세요. 연결망으로 보여집니다.</p>", isNodeGraph: true },
            { id: "3-4", icon: "🏛️", title: "4. 보호해야 할 유산", content: "<h3>소중한 문화유산</h3><p>우리가 지켜야 할 장소는 어디일까요?</p>", isBubbleChart: true },
            {
                id: "3-5", icon: "🌿", title: "5. 에코 투어리즘", content: `<h3>환경을 위한 선택</h3><div class="input-group" style="background:#fff; border:1px solid #ddd;">
                    <input type="text" id="pc-name" placeholder="이름" style="width:80px; border:1px solid #ddd; padding:10px; border-radius:10px;">
                    <select id="pc-type" style="padding:10px; border-radius:10px; border:1px solid #ddd;">
                        <option value="장점">✅ 찬성/장점</option>
                        <option value="단점">❌ 반대/단점</option>
                    </select>
                    <input type="text" id="pc-text" placeholder="의견을 입력하세요...">
                    <button class="back-btn" style="margin:0; background:var(--primary); color:white;" onclick="submitProsCons('3-5')">공유</button>
                </div>`, isProsCons: true, hideBoardInput: true
            },
            { id: "3-6", icon: "🔭", title: "6. 미래의 여행", content: "<h3>우주 여행 시대</h3><p>미래 여행하면 떠오르는 단어를 적어주세요.</p>", isWordCloud: true },
            { id: "3-7", icon: "📊", title: "7. 수업 만족도", content: `<h3>오늘 수업은?</h3><div class="quiz-options"><button class="quiz-btn" onclick="submitSurvey('3-7', '최고예요')">최고예요! 👍</button><button class="quiz-btn" onclick="submitSurvey('3-7', '좋아요')">좋아요 😊</button><button class="quiz-btn" onclick="submitSurvey('3-7', '보통예요')">보통예요 😐</button><button class="quiz-btn" onclick="submitSurvey('3-7', '아쉬워요')">아쉬워요 😢</button></div>`, isGraphicOrganizer: true, hideBoardInput: true },
            { id: "3-8", icon: "📤", title: "8. 최종 포트폴리오", content: `<h3>최종 결과물 제출</h3><div class="file-zone" ondragover="allowDrop(event)" ondrop="handleDrop(event, '3-8')"><p>📁 최종 파일을 드래그하여 제출</p></div>`, isAssignmentList: true, hideBoardInput: true },
            { id: "3-9", icon: "⭐", title: "9. 최종 마무리", content: `<h3>수업을 마치며</h3><div class="input-group"><input type="text" id="sync-name" placeholder="이름" style="width:100px; flex:none;"><input type="text" id="sync-thought" placeholder="수업 총평을 적어주세요..." onkeypress="handleEnterSync(event, '3-9')"></div>`, isLiveSync: true, hideBoardInput: true },
            { id: "3-10", icon: "📈", title: "10. 참여 통계", content: `<h3>우리 반 참여 현황</h3>`, isStats: true, hideBoard: true }
        ]
    }
};

let sharedResponses = {
    "1-1": {}, "1-2": [], "1-4": {}, "1-5": { "휴식": 0, "모험": 0, "음식": 0, "역사": 0, "기타": 0 },
    "1-6": [], "1-7": [], "1-8": [], "1-9": [],
    "2-1": {}, "2-2": { "장점": [], "단점": [] }, "2-3": [], "2-4": {}, "2-6": [], "2-7": [], "2-8": [], "2-9": [],
    "3-2": [], "3-3": [], "3-4": {}, "3-5": { "장점": [], "단점": [] }, "3-6": {}, "3-7": { "최고예요": 0, "좋아요": 0, "보통예요": 0, "아쉬워요": 0 }, "3-8": [], "3-9": []
};

let participation = {};

function recordParticipation(name, stepId) {
    if (!name) return;
    const cleanName = name.trim();
    if (!participation[cleanName]) participation[cleanName] = {};
    participation[cleanName][stepId] = true;
    saveData();
}

let quizQuestions = [
    { q: "세계에서 가장 작은 나라는?", a: ["바티칸 시국", "모나코", "나우루", "투발루"], c: 0 },
    { q: "프랑스의 수도는?", a: ["런던", "베를린", "파리", "마드리드"], c: 2 },
    { q: "에펠탑이 있는 도시는?", a: ["로마", "파리", "뉴욕", "도쿄"], c: 1 },
    { q: "자유의 여신상이 있는 나라는?", a: ["영국", "프랑스", "미국", "캐나다"], c: 2 },
    { q: "피라미드로 유명한 나라는?", a: ["그리스", "이탈리아", "이집트", "멕시코"], c: 2 },
    { q: "일본의 수도는?", a: ["오사카", "교토", "도쿄", "후쿠오카"], c: 2 },
    { q: "캥거루가 상징인 나라는?", a: ["뉴질랜드", "호주", "남아공", "브라질"], c: 1 },
    { q: "중국의 만리장성이 있는 나라는?", a: ["한국", "일본", "중국", "베트남"], c: 2 },
    { q: "이탈리아에서 피자로 유명한 도시는?", a: ["로마", "베네치아", "나폴리", "밀라노"], c: 2 },
    { q: "타지마할이 있는 나라는?", a: ["태국", "인도", "베트남", "인도네시아"], c: 1 }
];

let quizState = { currentIdx: 0, score: 0, studentName: "" };
let currentLessonId = 1;

function allowDrop(e) { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.add('dragover'); }
function handleDrop(e, stepId) { e.preventDefault(); e.stopPropagation(); e.currentTarget.classList.remove('dragover'); const files = e.dataTransfer.files; if (files.length > 0) processUpload(files[0], stepId); }
function handleFileSelect(e, stepId) { const files = e.target.files; if (files.length > 0) processUpload(files[0], stepId); }

function processUpload(file, stepId) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const name = prompt("본인 성명을 입력하세요:"); if (!name) return;
        const fileContent = e.target.result;
        recordParticipation(name, stepId);
        if (stepId.includes('1-2') || stepId.includes('2-6')) {
            sharedResponses[stepId].push({ name: name.trim(), img: fileContent, likes: 0 });
        } else {
            sharedResponses[stepId].push({ name: name.trim(), fileName: file.name, data: fileContent, type: file.type });
        }
        saveData(); updateBoard(stepId);
    };
    reader.readAsDataURL(file);
}

function openFile(data, fileName) {
    const link = document.createElement('a'); link.href = data; link.download = fileName; link.click();
}

function handleTrackedDownload(e, stepId) {
    const name = prompt("본인 성명을 입력하세요 (참여 통계용):");
    if (!name) { e.preventDefault(); return; }
    recordParticipation(name, stepId);
    alert(`${name.trim()}님, 활동지가 다운로드됩니다.`);
}

function loadLesson(id) {
    currentLessonId = parseInt(id);
    const lesson = lessonData[currentLessonId];
    document.querySelectorAll('.nav-link').forEach((link, idx) => link.classList.toggle('active', idx + 1 === currentLessonId));
    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-desc').innerText = lesson.desc;
    const container = document.getElementById('steps-container'); container.innerHTML = '';
    lesson.steps.forEach(step => {
        const card = document.createElement('div'); card.className = 'step-card'; card.onclick = () => showActivity(step);
        card.innerHTML = `<span class="step-icon">${step.icon}</span><span class="step-title">${step.title}</span>`;
        container.appendChild(card);
    });
    hideActivity();
}

function showActivity(step) {
    document.getElementById('steps-container').style.display = 'none';
    document.getElementById('lesson-header').style.display = 'none';
    const view = document.getElementById('activity-view'); view.style.display = 'block';

    let boardArea = "";
    if (!step.hideBoard) {
        let inputHtml = step.hideBoardInput ? "" : `
            <div class="input-group">
                <input type="text" id="student-name-input" placeholder="성명" style="width:100px; flex:none;">
                <input type="text" id="student-text-input" placeholder="함께 나눌 내용 입력...">
                <button class="back-btn" style="margin:0; background:var(--primary); color:white;" onclick="submitResponse('${step.id}')">공유</button>
            </div>`;
        boardArea = `<div class="response-board"><h3>👥 공유 공간</h3>${inputHtml}<div id="display-area"></div></div>`;
    }

    document.getElementById('activity-content').innerHTML = `<h2 style="color:var(--primary); margin-bottom:2rem;">${step.icon} ${step.title}</h2><div class="activity-body">${step.content}</div>${boardArea}`;
    if (step.id === '2-6') initWhiteboard();
    updateBoard(step.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBoard(stepId) {
    const area = document.getElementById('display-area'); if (!area) {
        if (lessonData[currentLessonId].steps.find(s => s.id === stepId)?.isStats) {
            document.getElementById('activity-content').innerHTML += '<div id="display-area"></div>';
            renderStats(document.getElementById('display-area'));
        }
        return;
    }
    const data = sharedResponses[stepId];
    const step = lessonData[currentLessonId].steps.find(s => s.id === stepId);

    if (step?.isStats) { renderStats(area); return; }

    if (step?.isPhotoGallery) {
        area.setAttribute('class', 'photo-grid');
        area.innerHTML = data.map((r, i) => `<div class="photo-card"><img src="${r.img}"><span class="student-name">${r.name}</span><button class="like-btn" onclick="addLike('${stepId}', ${i})">❤️ ${r.likes}</button></div>`).reverse().join('');
    } else if (step?.isWordCloud) {
        area.setAttribute('class', 'word-cloud');
        area.innerHTML = Object.entries(data).map(([word, count]) => `<span class="cloud-item" style="font-size: ${1 + count * 0.4}rem;">${word}</span>`).join('');
    } else if (step?.isProsCons) {
        area.setAttribute('class', 'pros-cons-grid');
        area.innerHTML = `
            <div class="pc-box pc-pros"><h4>✅ 찬성/장점</h4>${data['장점'].map(r => `<div class="response-item"><span class="student-name">${r.name}</span>${r.text}</div>`).reverse().join('')}</div>
            <div class="pc-box pc-cons"><h4>❌ 반대/단점</h4>${data['단점'].map(r => `<div class="response-item"><span class="student-name">${r.name}</span>${r.text}</div>`).reverse().join('')}</div>`;
    } else if (step?.isNodeGraph) {
        area.setAttribute('class', 'node-container');
        area.innerHTML = `<div class="hub">${step.icon}</div>` +
            data.map((r, i) => {
                const angle = (i / data.length) * 2 * Math.PI;
                return `<div class="node" style="transform: translate(${Math.cos(angle) * 120}px, ${Math.sin(angle) * 120}px)">${r.text}</div>`;
            }).join('');
    } else if (step?.isBubbleChart) {
        area.setAttribute('class', 'bubble-container');
        area.innerHTML = Object.entries(data).map(([label, count]) => `<div class="bubble" style="width:${70 + count * 20}px; height:${70 + count * 20}px; font-size:${0.8 + count * 0.1}rem;">${label}<br>${count}</div>`).join('');
    } else if (step?.isGraphicOrganizer) {
        area.setAttribute('class', 'org-chart');
        area.innerHTML = Object.entries(data).map(([label, count]) => `<div class="org-node"><span class="count">${count}</span><span class="label">${label}</span></div>`).join('');
    } else if (step?.isAssignmentList) {
        area.setAttribute('class', '');
        area.innerHTML = data.map(r => `<div class="assign-item"><span><b>${r.name}</b>: ${r.fileName}</span><button class="back-btn" style="margin:0" onclick="openFile('${r.data}', '${r.fileName}')">📥 다운로드</button></div>`).reverse().join('');
    } else if (step?.isPlaylist || step?.isMapLink) {
        area.setAttribute('class', 'response-grid');
        area.innerHTML = data.map(r => {
            const isLink = r.text && r.text.includes('http');
            const content = isLink ? `<a href="${r.text}" target="_blank" class="map-link-shared">🔗 링크 열기</a>` : r.text;
            return `<div class="response-item"><span class="student-name">${r.name}</span>${content}</div>`;
        }).reverse().join('');
    } else {
        area.setAttribute('class', 'response-grid');
        area.innerHTML = (Array.isArray(data) ? data : []).map(r => `<div class="response-item"><span class="student-name">${r.name}</span>${r.text}</div>`).reverse().join('');
    }
}

function renderStats(area) {
    area.setAttribute('class', 'stats-container text-center');
    const steps = lessonData[currentLessonId].steps.filter(s => !s.isStats);
    const stepIds = steps.map(s => s.id);

    // 해당 차시의 단계 중 하나라도 참여한 기록이 있는 학생만 필터링
    const students = Object.keys(participation).filter(name =>
        stepIds.some(id => participation[name] && participation[name][id])
    ).sort();

    let html = `<h3>${currentLessonId}차시 참여 현황판</h3>
                <div style="margin-bottom: 20px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button class="back-btn" onclick="clearAllData()" style="margin:0; border-color:#e74c3c; color:#e74c3c;">현황판 초기화</button>
                    <button class="back-btn" onclick="downloadExcel()" style="margin:0; background: #27ae60; color:white; border:none;">📊 ${currentLessonId}차시 결과 엑셀 다운로드</button>
                </div>`;
    html += `<div style="overflow-x:auto"><table class="stats-table"><thead><tr><th class="student-col">성명</th>`;
    steps.forEach(s => html += `<th>${s.title.split('.')[0]}</th>`);
    html += `</tr></thead><tbody>`;

    students.forEach(name => {
        html += `<tr><td class="student-col">${name}</td>`;
        steps.forEach(s => {
            const done = participation[name] && participation[name][s.id];
            html += `<td>${done ? 'O' : 'X'}</td>`;
        });
        html += `</tr>`;
    });

    if (students.length === 0) html += `<tr><td colspan="${steps.length + 1}">이 차시에 아직 참여한 학생이 없습니다.</td></tr>`;
    html += `</tbody></table></div>`;
    area.innerHTML = html;
}

function downloadExcel() {
    const steps = lessonData[currentLessonId].steps.filter(s => !s.isStats);
    const stepIds = steps.map(s => s.id);

    // 이 차시에 참여한 기록이 있는 학생만 엑셀에 포함
    const students = Object.keys(participation).filter(name =>
        stepIds.some(id => participation[name] && participation[name][id])
    ).sort();

    if (students.length === 0) return alert("다운로드할 데이터가 없습니다.");

    // CSV Header with BOM for Korean support
    let csvContent = "\uFEFF성명," + steps.map(s => s.title.replace(/,/g, "")).join(",") + "\n";

    // 1. Participation Table
    students.forEach(name => {
        const row = [name];
        steps.forEach(s => row.push(participation[name][s.id] ? "O" : "X"));
        csvContent += row.join(",") + "\n";
    });

    csvContent += "\n\n--- 상세 활동 내용 ---\n\n";

    // 2. Detailed Shared Content
    steps.forEach(s => {
        csvContent += `[${s.title}]\n`;
        const data = sharedResponses[s.id];
        if (!data) { csvContent += "(데이터 없음)\n\n"; return; }

        if (s.isWordCloud || s.isBubbleChart || s.isGraphicOrganizer) {
            // Aggregated visualization data (Word, Count)
            Object.entries(data).forEach(([key, val]) => csvContent += `${key} (${val}회)\n`);
        } else if (s.isProsCons) {
            csvContent += "찬성/장점\n";
            (data['장점'] || []).forEach(r => csvContent += `${r.text.replace(/,/g, " ")}\n`);
            csvContent += "반대/단점\n";
            (data['단점'] || []).forEach(r => csvContent += `${r.text.replace(/,/g, " ")}\n`);
        } else if (Array.isArray(data)) {
            data.forEach(r => {
                const text = r.text || r.fileName || (r.img ? "(이미지/캔버스 게시)" : "");
                csvContent += `${text.replace(/,/g, " ")}\n`;
            });
        }
        csvContent += "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${lessonData[currentLessonId].title}_활동결과.csv`;
    link.click();
}

function clearAllData() {
    if (confirm("모든 학생의 활동 데이터를 삭제하시겠습니까? 수업 기록이 모두 사라집니다.")) {
        localStorage.clear(); location.reload();
    }
}

function submitResponse(stepId) {
    const name = document.getElementById('student-name-input').value.trim();
    const text = document.getElementById('student-text-input').value.trim();
    if (!name || !text) return;
    recordParticipation(name, stepId);
    const step = lessonData[currentLessonId].steps.find(s => s.id === stepId);
    if (step.isWordCloud || step.isBubbleChart) sharedResponses[stepId][text] = (sharedResponses[stepId][text] || 0) + 1;
    else sharedResponses[stepId].push({ name, text });
    saveData(); updateBoard(stepId); document.getElementById('student-text-input').value = "";
}

function submitProsCons(stepId) {
    const name = document.getElementById('pc-name').value.trim(); if (!name) return alert("이름!");
    const type = document.getElementById('pc-type').value;
    const text = document.getElementById('pc-text').value.trim(); if (!text) return;
    recordParticipation(name, stepId);
    sharedResponses[stepId][type].push({ name, text });
    saveData(); updateBoard(stepId); document.getElementById('pc-text').value = "";
}

function handleEnterSync(e, stepId) {
    if (e.key === 'Enter') {
        const nameInput = document.getElementById('sync-name');
        const textInput = document.getElementById('sync-thought');
        if (!nameInput?.value.trim() || !textInput?.value.trim()) return;
        const name = nameInput.value.trim();
        recordParticipation(name, stepId);
        sharedResponses[stepId].push({ name, text: textInput.value.trim() });
        saveData(); updateBoard(stepId); textInput.value = "";
    }
}

function addLike(stepId, idx) { sharedResponses[stepId][idx].likes++; saveData(); updateBoard(stepId); }
function showOtherInput() { document.getElementById('other-input-area').style.display = 'flex'; }
function submitSurvey(stepId, option) {
    const name = prompt("본인 성명을 입력하세요:"); if (!name) return;
    recordParticipation(name.trim(), stepId);
    if (option === '기타') { const val = document.getElementById('survey-other').value.trim(); if (!val) return; sharedResponses[stepId][val] = 1; }
    else sharedResponses[stepId][option] = (sharedResponses[stepId][option] || 0) + 1;
    saveData(); updateBoard(stepId);
}

function startQuizWithName() {
    const name = document.getElementById('student-quiz-name').value.trim(); if (!name) return alert("성명을 입력하세요!");
    quizState.studentName = name; document.getElementById('quiz-init').style.display = 'none';
    quizState.currentIdx = 0; quizState.score = 0; renderQuiz();
}

function renderQuiz() {
    const area = document.getElementById('quiz-area');
    const stepId = `${currentLessonId}-8`;
    if (quizState.currentIdx >= quizQuestions.length) {
        recordParticipation(quizState.studentName, stepId);
        area.innerHTML = `<h3>${quizState.studentName}님 점수: ${quizState.score}/10</h3><button class="back-btn" onclick="showQuizAnswers()">정답 확인</button>`;
        sharedResponses[stepId].push({ name: quizState.studentName, text: `퀴즈 점수: ${quizState.score}점` });
        saveData(); updateBoard(stepId); return;
    }
    const q = quizQuestions[quizState.currentIdx];
    area.innerHTML = `<div class="quiz-box"><p>${quizState.studentName}님 (${quizState.currentIdx + 1}/10)</p><div class="quiz-q-text">${q.q}</div><div class="quiz-options">${q.a.map((opt, i) => `<button class="quiz-btn" onclick="handleQuizAns(${i})">${opt}</button>`).join('')}</div></div>`;
}

function handleQuizAns(idx) { if (idx === quizQuestions[quizState.currentIdx].c) quizState.score++; quizState.currentIdx++; renderQuiz(); }
function showQuizAnswers() { document.getElementById('quiz-area').innerHTML = `<h3>정답 해설</h3><div style="text-align:left;">${quizQuestions.map((q, i) => `<p>${i + 1}. ${q.q} - <b>${q.a[q.c]}</b></p>`).join('')}</div>`; }
function hideActivity() { document.getElementById('steps-container').style.display = 'grid'; document.getElementById('lesson-header').style.display = 'block'; document.getElementById('activity-view').style.display = 'none'; }

// --- Whiteboard ---
let isDrawing = false; let ctx = null;
function initWhiteboard() {
    const canvas = document.getElementById('whiteboard'); if (!canvas) return; ctx = canvas.getContext('2d');
    ctx.strokeStyle = document.getElementById('get-pen-color').value; ctx.lineWidth = 3; ctx.lineCap = 'round';
    canvas.onmousedown = (e) => { isDrawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); };
    canvas.onmousemove = (e) => { if (isDrawing) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); } };
    window.onmouseup = () => { isDrawing = false; };
}
function clearCanvas() { const canvas = document.getElementById('whiteboard'); if (canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); }
function postCanvas(stepId) {
    const canvas = document.getElementById('whiteboard'); if (!canvas) return; const name = prompt("본인 성명을 입력하세요:"); if (!name) return;
    recordParticipation(name.trim(), stepId);
    sharedResponses[stepId].push({ name: name.trim(), img: canvas.toDataURL(), likes: 0 });
    saveData(); updateBoard(stepId); alert("공유되었습니다!");
}

window.onload = () => { loadData(); loadLesson(1); };
