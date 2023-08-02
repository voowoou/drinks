import React from "react";

function CoctailImg() {

}

function Recipe() {
    return (
        <div>
            <div>
                <span>INGRIDIENTS</span>
            </div>
            <div>
                <span>GLASS</span>
            </div>
            <div>
                <span>INSTRUCTIONS</span>
            </div>
        </div>
    );
}

export default function CoctailInfo() {
    return (
        <div>
            <CoctailImg />
            <Recipe />
        </div>
    );
}