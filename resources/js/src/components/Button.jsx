import React from "react";

class Button extends React.Component {
    render() {
        const { text, onClick, type = "button", active = false } = this.props;

        return (
            <button
                type={type}
                onClick={onClick}
                style={{
                    padding: "8px 16px",
                    backgroundColor: active ? "#007bff" : "#e0e0e0",
                    color: active ? "#fff" : "#000",
                    border: "1px solid #007bff",
                    borderRadius: "5px",
                    cursor: "pointer",
                    flex: 1
                }}
            >
                {text}
            </button>
        );
    }
}

export default Button;
