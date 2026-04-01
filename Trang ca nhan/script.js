let userData = {
    fullname: "Nguyễn Văn A",
    email: "vana.nguyen@hcmue.edu.vn",
    studentId: "48.01.104.001",
    phone: "0901 234 567",
    address: "280 An Dương Vương, Quận 5, TP.HCM",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=4338ca&color=fff"
};

function init() {
    document.getElementById('displayFullname').innerText = userData.fullname;
    document.getElementById('displayEmail').innerText = userData.email;
    document.getElementById('displayAvatar').src = userData.avatar;
    document.getElementById('inputFullname').value = userData.fullname;
    document.getElementById('inputStudentId').value = userData.studentId;
    document.getElementById('inputPhone').value = userData.phone;
    document.getElementById('inputAddress').value = userData.address;
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => document.getElementById('displayAvatar').src = e.target.result;
        reader.readAsDataURL(file);
    }
}

function saveProfile() {
    userData.fullname = document.getElementById('inputFullname').value;
    document.getElementById('displayFullname').innerText = userData.fullname;
    alert("Lưu thông tin thành công!");
}

function resetForm() {
    if(confirm("Hủy thay đổi?")) init();
}

// --- LOGIC BÀI VIẾT & BÌNH LUẬN ---

const modal = document.getElementById("postModal");
const openBtn = document.getElementById("openModalBtn");

openBtn.onclick = () => modal.style.display = "block";
function closeModal() { modal.style.display = "none"; }
window.onclick = (e) => { if(e.target == modal) closeModal(); }

function addNewPost() {
    const title = document.getElementById('newPostTitle').value;
    const tag = document.getElementById('newPostTag').value;
    const desc = document.getElementById('newPostDesc').value;

    if(!title || !desc) return alert("Vui lòng điền đủ thông tin!");

    const id = Date.now();
    const postHTML = `
        <div class="post-card" id="post-${id}">
            <div class="post-tag">${tag}</div>
            <h4 class="post-title">${title}</h4>
            <p class="post-desc">${desc}</p>
            <div class="post-meta">
                <span class="post-time"><i class="fa-regular fa-clock"></i> Vừa xong</span>
                <div class="post-stats">
                    <span class="like-btn"><i class="fa-regular fa-heart"></i> <small>0</small></span>
                    <span class="comment-btn" onclick="toggleComments(${id})"><i class="fa-regular fa-comment"></i> <small>0</small></span>
                </div>
            </div>
            <div class="comment-section" id="sec-${id}">
                <div class="comment-list" id="list-${id}"></div>
                <div class="comment-input-group">
                    <input type="text" id="in-${id}" placeholder="Bình luận...">
                    <button class="btn-send-comment" onclick="sendComment(${id})"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('postsContainer').insertAdjacentHTML('afterbegin', postHTML);
    document.getElementById('newPostTitle').value = "";
    document.getElementById('newPostDesc').value = "";
    closeModal();
}

function toggleComments(id) {
    const sec = document.getElementById(`sec-${id}`);
    sec.style.display = (sec.style.display === "block") ? "none" : "block";
}

function sendComment(id) {
    const input = document.getElementById(`in-${id}`);
    const text = input.value.trim();
    if(!text) return;

    const list = document.getElementById(`list-${id}`);
    list.insertAdjacentHTML('beforeend', `<div class="comment-item"><b>Bạn:</b> ${text}</div>`);
    
    const count = document.querySelector(`#post-${id} .comment-btn small`);
    count.innerText = parseInt(count.innerText) + 1;
    input.value = "";
}

// Like logic
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.like-btn');
    if(btn) {
        const icon = btn.querySelector('i');
        const num = btn.querySelector('small');
        icon.classList.toggle('fa-regular');
        icon.classList.toggle('fa-solid');
        let val = parseInt(num.innerText);
        if(icon.classList.contains('fa-solid')) {
            btn.style.color = "#ef4444";
            num.innerText = val + 1;
        } else {
            btn.style.color = "";
            num.innerText = val - 1;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    init();
    // Tạo bài mẫu
    document.getElementById('newPostTitle').value = "Chào mừng bạn!";
    document.getElementById('newPostDesc').value = "Hãy thử tính năng Bình luận và Thả tim bên dưới.";
    addNewPost();
});
