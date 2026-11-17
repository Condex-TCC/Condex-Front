//Campo de senha reutilizável, com máscara que pode ser revelada pelo usuário

import { useState } from "react"
import styles from "../css/campoSenha.module.css"

export default function CampoSenha({

    id,
    value,
    onChange,
    placeholder = "••••••",
    autoComplete = "current-password",
    minLength,
    required = false,
    disabled = false,
    inputClassName = "",
    className = ""
}){

    //Estado que controla se a senha aparece em texto ou permanece mascarada
    const [visivel, setVisivel] = useState(false)

    return (

        <div className={`${styles.campo} ${className}`}>

            <input
                id={id}
                className={`${styles.input} ${inputClassName}`}
                type={visivel ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                minLength={minLength}
                required={required}
                disabled={disabled}
                style={{ paddingRight: 44 }}
            />

            <button
                type="button"
                className={styles.botao}
                onClick={() => setVisivel((atual) => !atual)}
                aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={visivel}
                disabled={disabled}
            >
                {visivel ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"></path>
                        <path d="m15 15-3-3m-3-3L3 3"></path>
                        <path d="m21 21-3.5-3.5"></path>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                )}
            </button>

        </div>
    )
}
