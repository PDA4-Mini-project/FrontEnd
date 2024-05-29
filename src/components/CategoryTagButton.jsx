export default function CategoryTag(props) {
    const category = props.category;
    const gardenCategory = props.gardenCategory;
    const color = {
        기술: 'bg-[#FEA29D]',
        상담: 'bg-[#441961]',
        자기계발: 'bg-[#FFC5CF]',
        예술: 'bg-[#FE3A52]',
        언어: 'bg-[#A0ACEC]',
        생활: 'bg-[#FC9925]',
    };
    const selectCategory = props.selectCategory;

    return (
        <div
            className={`${color[category]} w-fit py-2 px-3 rounded-[36px] text-white hover:cursor-pointer ${gardenCategory !== category && 'brightness-75'} hover:brightness-100`}
            onClick={() => selectCategory(category)}
        >
            <p>{category}</p>
        </div>
    );
}
