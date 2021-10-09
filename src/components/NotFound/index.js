import React from 'react';
import './NotFound.css';

function NotFound(params) {
    return (
        <div id="colorlib-notfound">
            <div class="colorlib-notfound">
                <div class="colorlib-notfound-404">
                    <h1>404</h1>
                </div>
                <h2 id="colorlib_404_customizer_page_heading">Oops! This Page Could Not Be Found</h2>
                <div id="colorlib_404_customizer_content">
                    Sorry but the page you are looking for does not exist, have been removed. Name changed or is
                    temporarily unavailable
                </div>
                <a href="/" id="colorlib_404_customizer_button_text">
                    Go to home page
                </a>
            </div>
        </div>
    );
}

export default NotFound;
