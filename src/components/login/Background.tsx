interface BackgroundProps {
  animate: boolean;
}

const gradients = [
  'linear-gradient(180deg, #D5F4FF 0%, #80CAF6 39.9%, #4CB1F1 64.42%)',
  'linear-gradient(180deg, #EFF7FB 0%, #CAF1FF 100%)'
];

const Background = ({ animate }: BackgroundProps) => {
  
  return (
    <>
        <div className="flex flex-col min-h-screen justify-center absolute inset-0"
            style={{
                background: gradients[0],
                transition: 'opacity 2000ms',
                opacity: animate ? 1 : 0,
            }}
        />
        <div className="flex flex-col min-h-screen justify-center absolute inset-0"
            style={{
                background: gradients[1],
                transition: 'opacity 2000ms',
                opacity: animate ? 0 : 1,
            }}
        />
    </>
  );
};
export default Background;