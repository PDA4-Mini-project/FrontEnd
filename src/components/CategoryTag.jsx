export default function CategoryTag(props) {
    const category = props.category;
    const color = {
        기술: 'FEA29D',
        상담: '441961',
        자기계발: 'FFC5CF',
        예술: 'FE3A52',
        언어: 'A0ACEC',
        생활: 'FC9925',
    };

    return (
        <div className={`bg-[#${color[category]}] w-fit py-2 px-3 rounded-[36px] text-white`}>
            <p>{category}</p>
        </div>
    );
}
