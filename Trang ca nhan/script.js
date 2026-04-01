let userData = {
    fullname: "Nguyễn Văn A",
    email: "vana.nguyen@hcmue.edu.vn",
    studentId: "48.01.104.001",
    phone: "0901 234 567",
    address: "280 An Dương Vương, Quận 5, TP.HCM",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=4338ca&color=fff"
};

let tempImg = "";
let tempDoc = "";

function init() {
    document.getElementById('displayFullname').innerText = userData.fullname;
    document.getElementById('displayEmail').innerText = userData.email;
    document.getElementById('displayAvatar').src = userData.avatar;
    document.getElementById('inputFullname').value = userData.fullname;
    document.getElementById('inputStudentId').value = userData.studentId;
    document.getElementById('inputPhone').value = userData.phone;
    document.getElementById('inputAddress').value = userData.address;
}

// Preview ảnh/tài liệu
function handleFileSelect(input, type) {
    const file = input.files[0];
    if (!file) return;
    const previewArea = document.getElementById('filePreview');
    if (type === 'img') {
        const reader = new FileReader();
        reader.onload = (e) => {
            tempImg = e.target.result;
            previewArea.innerHTML += `<div>📸 Ảnh: ${file.name}</div>`;
        };
        reader.readAsDataURL(file);
    } else {
        tempDoc = file.name;
        previewArea.innerHTML += `<div>📄 File: ${file.name}</div>`;
    }
}

// Modal Toggle
const modal = document.getElementById("postModal");
const openBtn = document.getElementById("openModalBtn");

openBtn.onclick = () => modal.style.display = "block";
function closeModal() { 
    modal.style.display = "none";
    tempImg = ""; tempDoc = "";
    document.getElementById('filePreview').innerHTML = "";
    document.getElementById('newPostTitle').value = "";
    document.getElementById('newPostDesc').value = "";
}

// THÊM BÀI VIẾT MỚI
function addNewPost() {
    const title = document.getElementById('newPostTitle').value;
    const tag = document.getElementById('newPostTag').value;
    const desc = document.getElementById('newPostDesc').value;

    if(!title || !desc) return alert("Vui lòng nhập đủ thông tin!");

    const id = Date.now();
    const imgHtml = tempImg ? `<img src="${tempImg}" class="post-img-display">` : "";
    const docHtml = tempDoc ? `<div class="post-file-box" style="background:#f1f5f9; padding:8px; border-radius:8px; font-size:12px; margin-bottom:10px;"><i class="fa-solid fa-file"></i> ${tempDoc}</div>` : "";

    const postHTML = `
        <div class="post-card" id="post-${id}">
            <div class="post-tag">${tag}</div>
            <h4 class="post-title" style="margin:0 0 10px 0;">${title}</h4>
            <p class="post-desc" style="font-size:14px; color:#64748b;">${desc}</p>
            ${imgHtml}
            ${docHtml}
            
            <div class="post-meta">
                <span style="font-size:12px; color:#94a3b8;"><i class="fa-regular fa-clock"></i> Vừa xong</span>
                <div class="post-stats">
                    <div class="reaction-wrapper">
                        <span class="react-btn" style="cursor:pointer;" onclick="toggleMenu(${id})">
                            <i class="fa-regular fa-heart"></i> <small id="count-${id}">0</small>
                        </span>
                        <div class="reaction-menu" id="menu-${id}" style="display:none;">
                            <span onclick="doReact(${id}, '❤️')">❤️</span>
                            <span onclick="doReact(${id}, '👍')">👍</span>
                            <span onclick="doReact(${id}, '😮')">😮</span>
                        </div>
                    </div>
                    <span class="comment-trigger" style="cursor:pointer;" onclick="toggleComments(${id})">
                        <i class="fa-regular fa-comment"></i> <small id="comm-count-${id}">0</small>
                    </span>
                </div>
            </div>

            <div class="comment-section" id="sec-${id}" style="display:none; margin-top:15px; border-top:1px solid #f1f5f9; padding-top:10px;">
                <div class="comment-list" id="list-${id}" style="max-height:100px; overflow-y:auto; margin-bottom:10px; font-size:13px;"></div>
                <div style="display:flex; gap:5px;">
                    <input type="text" id="in-${id}" placeholder="Viết bình luận..." style="flex:1; padding:8px; border-radius:20px; border:1px solid #e2e8f0; outline:none; font-size:13px;">
                    <button onclick="sendComment(${id})" style="background:#4338ca; color:white; border:none; width:32px; height:32px; border-radius:50%; cursor:pointer;"><i class="fa-solid fa-paper-plane" style="font-size:12px;"></i></button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('postsContainer').insertAdjacentHTML('afterbegin', postHTML);
    closeModal();
}

// Logic Cảm xúc
function toggleMenu(id) {
    const m = document.getElementById(`menu-${id}`);
    m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
}

function doReact(id, icon) {
    const count = document.getElementById(`count-${id}`);
    const btn = document.querySelector(`#post-${id} .react-btn`);
    count.innerText = parseInt(count.innerText) + 1;
    btn.innerHTML = `${icon} <small id="count-${id}">${count.innerText}</small>`;
    document.getElementById(`menu-${id}`).style.display = 'none';
}

// LOGIC BÌNH LUẬN (SỬA LỖI)
function toggleComments(id) {
    const sec = document.getElementById(`sec-${id}`);
    sec.style.display = (sec.style.display === "block") ? "none" : "block";
}

function sendComment(id) {
    const input = document.getElementById(`in-${id}`);
    const text = input.value.trim();
    if(!text) return;

    const list = document.getElementById(`list-${id}`);
    list.insertAdjacentHTML('beforeend', `<div style="background:#f8fafc; padding:5px 10px; border-radius:10px; margin-bottom:5px;"><b>Bạn:</b> ${text}</div>`);
    
    const count = document.getElementById(`comm-count-${id}`);
    count.innerText = parseInt(count.innerText) + 1;
    input.value = "";
}

function saveProfile() {
    userData.fullname = document.getElementById('inputFullname').value;
    document.getElementById('displayFullname').innerText = userData.fullname;
    alert("Lưu hồ sơ thành công!");
}

window.onclick = (e) => { 
    if(e.target == modal) closeModal(); 
    if(!e.target.closest('.reaction-wrapper')) {
        document.querySelectorAll('.reaction-menu').forEach(m => m.style.display = 'none');
    }
}
document.addEventListener('DOMContentLoaded', init);
