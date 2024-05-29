import t1 from '/flowers/t1.png';
import t2 from '/flowers/t2.png';
import t3 from '/flowers/t3.png';
import t4 from '/flowers/t4.png';
import t5 from '/flowers/t5.png';
import r1 from '/flowers/r1.png';
import r2 from '/flowers/r2.png';
import r3 from '/flowers/r3.png';
import r4 from '/flowers/r4.png';
import r5 from '/flowers/r5.png';
import l1 from '/flowers/l1.png';
import l2 from '/flowers/l2.png';
import l3 from '/flowers/l3.png';
import l4 from '/flowers/l4.png';
import l5 from '/flowers/l5.png';
import i1 from '/flowers/i1.png';
import i2 from '/flowers/i2.png';
import i3 from '/flowers/i3.png';
import i4 from '/flowers/i4.png';
import i5 from '/flowers/i5.png';
import v1 from '/flowers/v1.png';
import v2 from '/flowers/v2.png';
import v3 from '/flowers/v3.png';
import v4 from '/flowers/v4.png';
import v5 from '/flowers/v5.png';
import s1 from '/flowers/s1.png';
import s2 from '/flowers/s2.png';
import s3 from '/flowers/s3.png';
import s4 from '/flowers/s4.png';
import s5 from '/flowers/s5.png';
import { useSelector } from 'react-redux';

export default function TalentFlowers() {
    const flowers = useSelector((state) => state.userTheme);
    // || [
    //     {
    //         user_id: 'ha',
    //         theme_name: '기술',
    //         exp: 0,
    //         level: 5,
    //         createdAt: '2024-05-29T12:10:00.000Z',
    //         updatedAt: '2024-05-29T12:10:00.000Z',
    //     },
    //     {
    //         user_id: 'ha',
    //         theme_name: '생활',
    //         exp: 0,
    //         level: 1,
    //         createdAt: '2024-05-29T12:10:00.000Z',
    //         updatedAt: '2024-05-29T12:10:00.000Z',
    //     },
    // ];

    const flowerName = {
        기술: '튤립',
        상담: '라벤더',
        자기개발: '연꽃',
        예술: '장미',
        언어: '아이리스',
        생활: '해바라기',
    };

    const alphabet = {
        기술: 't',
        상담: 'v',
        자기개발: 'l',
        예술: 'r',
        언어: 'i',
        생활: 's',
    };

    const images = {
        t1,
        t2,
        t3,
        t4,
        t5,
        r1,
        r2,
        r3,
        r4,
        r5,
        l1,
        l2,
        l3,
        l4,
        l5,
        i1,
        i2,
        i3,
        i4,
        i5,
        v1,
        v2,
        v3,
        v4,
        v5,
        s1,
        s2,
        s3,
        s4,
        s5,
    };

    return (
        <div className="bg-white mt-12 p-12 grid gap-12">
            <p className="font-bold text-xl text-center">나의 재능꽃</p>
            {flowers?.map((el, i) => (
                <div className="flex justify-center space-x-12" key={i}>
                    <img className="w-36 h-56 object-cover" src={images[`${alphabet[el.theme_name]}${el.level}`]} />
                    <div className="w-full flex-col content-end space-y-2">
                        <p className="font-extrabold text-xl">
                            {flowerName[el.theme_name]}({el.theme_name})
                        </p>
                        <p className="font-bold text-lg">Lv.{el.level}</p>
                        <div>게이지가 있을 예정</div>
                    </div>
                </div>
            ))}
            {!flowers && (
                <div>
                    <img />
                </div>
            )}
        </div>
    );
}
