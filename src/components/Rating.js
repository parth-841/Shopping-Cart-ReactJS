import React from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

function Rating({ rate, onClick, style }) {
    return (
        <>
            {
                [...Array(5)].map((item, index) => (
                    <span key={index} style={{ style }} onClick={() => onClick(index)}>
                        {rate > index ? (
                            <AiFillStar fontSize="15px" color='gray' />
                        ) : (
                            <AiOutlineStar fontSize="15px" color='gray' />
                        )}
                    </span>
                ))
            }
        </>
    )
}

export default Rating
