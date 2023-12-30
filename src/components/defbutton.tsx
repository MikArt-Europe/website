import React from "react";

interface Props {
    styles: string;
    destination: string;
    text: string;
}

export const Button: React.FC<Props> = (props) => (
    <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-mprimary bg-blue-gradient rounded-[10px] outline-none ${props.styles}`}><a href={props.destination}>{props.text}</a></button>
);

Button.defaultProps = {
    text: 'Get started',
    styles: '',
};