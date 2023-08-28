// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const imageItems = document.querySelectorAll('.image-item');
    const profile = document.querySelector('.profile');
    const voteButton = document.querySelector('button');

    let selectedParticipant = null;

    imageItems.forEach((item) => {
        item.addEventListener('click', () => {
            // 이미지 선택 시 프로필 업데이트
            selectedParticipant = item.querySelector('h3').textContent;
            profile.textContent = selectedParticipant;
            
            // 이미지 선택 및 해제 시 스타일 처리
            item.classList.toggle('selected');
            imageItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('selected');
                }
            });
        });
    });

    voteButton.addEventListener('click', () => {
        if (selectedParticipant) {
            // 선택한 참가자 이름과 함께 서버로 투표 요청 전송
            console.log(`투표: ${selectedParticipant}`);
            // 서버로 투표 요청을 보내는 등의 작업 추가
        }
    });
});
