export default function TalentFlowers() {
    const flowers = [
        {
            user_id: 'ha',
            theme_name: '기술',
            exp: 0,
            level: 1,
            createdAt: '2024-05-29T12:10:00.000Z',
            updatedAt: '2024-05-29T12:10:00.000Z',
        },
        {
            user_id: 'ha',
            theme_name: '상담',
            exp: 0,
            level: 1,
            createdAt: '2024-05-29T12:10:00.000Z',
            updatedAt: '2024-05-29T12:10:00.000Z',
        },
    ];
    const flowerName = {
      기술: "튤립",
      상담: '라벤더',
      자기개발: '연꽃',
      예술: '장미',
      언어: '아이리스',
      생활: '해바라기'
    }
    
    return (
        <div className="bg-white mt-12 p-12 grid gap-12">
            <p className="font-bold text-xl text-center">나의 재능꽃</p>
            <div className="flex justify-center space-x-12">
                <img className="w-36 h-56" src="https://images.unsplash.com/photo-1560790671-b76ca4de55ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVBJUJEJTgzfGVufDB8fDB8fHww" />
                <div className="w-full flex-col content-end space-y-2">
                    <p className="font-extrabold text-xl">라벤더(상담)</p>
                    <p className="font-bold text-lg">Lv.5</p>
                    <div>게이지가 있을 예정</div>
                </div>
            </div>
        </div>
    );
}
