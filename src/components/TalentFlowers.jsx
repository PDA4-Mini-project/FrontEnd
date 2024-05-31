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
import no from '/notalent.png';
import { useSelector } from 'react-redux';
import FuncButton from './FuncButton';
import { useNavigate } from 'react-router-dom';

export default function TalentFlowers() {
    const flowers = useSelector((state) => state.user.userTheme);
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

    const colors = {
        기술: 'bg-[#FEA29D]',
        상담: 'bg-[#441961]',
        자기개발: 'bg-[#FFC5CF]',
        예술: 'bg-[#FE3A52]',
        언어: 'bg-[#A0ACEC]',
        생활: 'bg-[#FC9925]',
    };

    const exp = {
        0: 'w-0',
        1: 'w-1/12',
        2: 'w-2/12',
        3: 'w-3/12',
        4: 'w-4/12',
        5: 'w-5/12',
        6: 'w-6/12',
        7: 'w-7/12',
        8: 'w-8/12',
        9: 'w-9/12',
        10: 'w-10/12',
        11: 'w-11/12',
        12: 'w-12/12',
    };

    const navigate = useNavigate();

    return (
        <div className="bg-white mt-12 py-12 px-24 grid gap-12">
            <p className="font-bold text-xl text-center">나의 재능꽃</p>
            {flowers?.map((el, i) => (
                <div className="flex justify-center space-x-12" key={i}>
                    <img className="w-36 h-56 object-cover" src={images[`${alphabet[el.theme_name]}${el.level}`]} />
                    <div className="w-full flex-col content-end space-y-2">
                        <p className="font-extrabold text-xl">
                            {flowerName[el.theme_name]}({el.theme_name})
                        </p>
                        <p className="font-bold text-lg">Lv.{el.level}</p>
                        <div className="flex items-center space-x-6">
                            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                                <div className={`${colors[el.theme_name]} h-4 rounded-full ${exp[el.exp]}`}></div>
                            </div>
                            <p>{(el.exp / 12) * 100}%</p>
                        </div>
                    </div>
                </div>
            ))}
            {!flowers && (
                <div className="grid justify-items-center gap-6">
                    <img src={no} />
                    <p className="font-bold text-xl">아직 재능꽃이 없어요</p>
                    <FuncButton text="꽃 키우러가기" func={() => navigate('/garden')} color="green" />
                </div>
            )}
        </div>
    );
}
