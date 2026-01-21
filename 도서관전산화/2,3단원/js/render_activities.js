// render_activities.js
// This script reads the activityData object defined in activity_data.js
// and dynamically generates interactive activity sections for Unit 2 and Unit 3.
// It uses a premium modal interface to handle student inputs.

(function () {
    // Ensure activityData is loaded
    if (typeof activityData === 'undefined') {
        console.error('activityData is not defined.');
        return;
    }

    // Utility to create an element with optional class and innerHTML
    function createEl(tag, className, html) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (html) el.innerHTML = html;
        return el;
    }

    // Modal Helper
    const Modal = {
        el: null,
        init() {
            if (this.el) return;
            const modalHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-header-info">
                            <p id="modal-step-label"></p>
                            <h3 id="modal-title">활동 제목</h3>
                        </div>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-instruction-box">
                            <h4>활동 안내</h4>
                            <div id="modal-instructions"></div>
                        </div>
                        <div class="modal-input-area" id="modal-input-container"></div>
                    </div>
                    <div class="modal-footer">
                        <div class="save-indicator" id="modal-save-status">
                            <div class="pulse"></div>
                            <span>실시간 저장 중</span>
                        </div>
                        <button class="act-btn" id="modal-close-btn" style="padding: 0.5rem 1.5rem;">활동 완료</button>
                    </div>
                </div>
            `;
            this.el = createEl('div', null, modalHTML);
            this.el.id = 'activity-modal';
            document.body.appendChild(this.el);

            const closeBtn = this.el.querySelector('.close-modal');
            const footerCloseBtn = this.el.querySelector('#modal-close-btn');

            closeBtn.onclick = () => this.hide();
            footerCloseBtn.onclick = () => this.hide();
            this.el.onclick = (e) => { if (e.target === this.el) this.hide(); };
        },

        show(unitKey, actKey, act) {
            this.init();
            const storageKey = `${unitKey}-${actKey}`;
            const stepLabel = act.step || '';
            const title = act.title || '';

            document.getElementById('modal-step-label').textContent = stepLabel;
            document.getElementById('modal-title').textContent = title;

            const instrContainer = document.getElementById('modal-instructions');
            instrContainer.innerHTML = '';
            if (Array.isArray(act.instruction)) {
                const ul = document.createElement('ul');
                ul.className = 'act-instructions';
                act.instruction.forEach(i => ul.appendChild(createEl('li', null, i)));
                instrContainer.appendChild(ul);
            } else {
                instrContainer.textContent = act.description;
            }

            const inputContainer = document.getElementById('modal-input-container');
            inputContainer.innerHTML = '';
            const statusSpan = document.getElementById('modal-save-status');

            const saved = localStorage.getItem(storageKey) || '';

            // Create input based on type
            let inputEl;
            if (act.type === 'selection' && Array.isArray(act.options)) {
                inputEl = document.createElement('select');
                act.options.forEach(opt => {
                    const o = document.createElement('option');
                    o.value = opt;
                    o.textContent = opt;
                    if (opt === saved) o.selected = true;
                    inputEl.appendChild(o);
                });
                inputEl.onchange = () => {
                    localStorage.setItem(storageKey, inputEl.value);
                    this.notifySuccess(unitKey, actKey);
                };
            } else if (act.type === 'file_upload') {
                inputEl = document.createElement('div');
                const fileIn = document.createElement('input');
                fileIn.type = 'file';
                const fileLabel = createEl('p', null, saved ? `현재 파일: ${saved}` : '파일을 선택하세요.');
                fileIn.onchange = () => {
                    const fileName = fileIn.files[0] ? fileIn.files[0].name : '';
                    localStorage.setItem(storageKey, fileName);
                    fileLabel.textContent = `업로드됨: ${fileName}`;
                    this.notifySuccess(unitKey, actKey);
                };
                inputEl.appendChild(fileIn);
                inputEl.appendChild(fileLabel);
            } else {
                inputEl = document.createElement('textarea');
                inputEl.placeholder = act.placeholder || '활동 내용을 적어보세요...';
                // Adjust size: 10 rows for long text, 5 for standard (half of previous size)
                inputEl.rows = (act.type === 'long_text' || act.type === 'text_area') ? 10 : 5;
                inputEl.value = saved;
                inputEl.oninput = () => {
                    localStorage.setItem(storageKey, inputEl.value);
                    this.notifySuccess(unitKey, actKey);
                };
            }

            inputContainer.appendChild(inputEl);
            this.el.classList.add('active');
            document.body.style.overflow = 'hidden';
        },

        hide() {
            this.el.classList.remove('active');
            document.body.style.overflow = '';
        },

        notifySuccess(unitKey, actKey) {
            const btn = document.querySelector(`[data-unit="${unitKey}"][data-act="${actKey}"]`);
            if (btn) {
                btn.classList.add('completed');
                btn.innerHTML = '<span>✅</span> 활동 내용 수정하기';
            }
        }
    };

    // Render activities for a given unit
    function renderUnit(unitKey) {
        const unit = activityData[unitKey];
        if (!unit) return;
        const container = document.getElementById(unitKey + '-activities');
        if (!container) return;

        const steps = {};
        Object.entries(unit).forEach(([actKey, act]) => {
            const stepLabel = act.step || '기타';
            if (!steps[stepLabel]) steps[stepLabel] = [];
            steps[stepLabel].push({ key: actKey, data: act });
        });

        const sortedStepLabels = Object.keys(steps).sort((a, b) => {
            const getNum = s => parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
            return getNum(a) - getNum(b);
        });

        sortedStepLabels.forEach(stepLabel => {
            const stepSection = createEl('section', 'gagne-step');
            if (unitKey === 'unit3') stepSection.style.borderLeftColor = '#10B981';

            const header = createEl('div', 'gagne-step-header');
            const labelDiv = createEl('div', null, `<div class="step-label" ${unitKey === 'unit3' ? 'style="color:#10B981;"' : ''}>${stepLabel}</div>`);
            const title = createEl('h2', 'step-title', stepLabel.replace('Step', '단계'));
            header.appendChild(labelDiv);
            header.appendChild(title);
            stepSection.appendChild(header);

            const activityList = createEl('div', 'activity-list');
            steps[stepLabel].forEach(actObj => {
                const act = actObj.data;
                const actDiv = createEl('div', 'activity-item');
                actDiv.appendChild(createEl('div', 'act-title', act.title));
                actDiv.appendChild(createEl('div', 'act-desc', act.description));

                const metaDiv = createEl('div', 'act-meta');
                if (act.time) metaDiv.appendChild(createEl('span', null, `⏱ ${act.time}`));
                if (act.grouping) metaDiv.appendChild(createEl('span', null, `👥 ${act.grouping}`));
                if (act.resource) metaDiv.appendChild(createEl('span', 'act-resource-badge', act.resource));
                actDiv.appendChild(metaDiv);

                const storageKey = `${unitKey}-${actObj.key}`;
                const hasSaved = !!localStorage.getItem(storageKey);

                const actionContainer = createEl('div', 'act-action-container');
                const btn = createEl('button', 'act-btn');
                btn.dataset.unit = unitKey;
                btn.dataset.act = actObj.key;

                if (hasSaved) {
                    btn.classList.add('completed');
                    btn.innerHTML = '<span>✅</span> 활동 내용 수정하기';
                } else {
                    btn.innerHTML = '<span>✍️</span> 활동 시작하기';
                }

                btn.onclick = () => Modal.show(unitKey, actObj.key, act);
                actionContainer.appendChild(btn);
                actDiv.appendChild(actionContainer);
                activityList.appendChild(actDiv);
            });
            stepSection.appendChild(activityList);
            container.appendChild(stepSection);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderUnit('unit2');
        renderUnit('unit3');
    });
})();
