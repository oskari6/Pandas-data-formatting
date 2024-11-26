type OptionButtonsProps = {
  toggle: () => void;
  text: string;
};

const OptionButtons = ({ toggle, text }: OptionButtonsProps): JSX.Element => {
  return (
    <div className="z-[3] fixed bottom-10 left-1/2 transform -translate-x-1/2">
      <div className="shadow-xl bg-gray-200 rounded-lg flex justify-center">
        <button onClick={() => toggle()} className="p-5">
          {text}
        </button>
        <button className="p-5">Filter</button>
      </div>
    </div>
  );
};

export default OptionButtons;
