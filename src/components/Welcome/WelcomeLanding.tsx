import { Button } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

const WelcomeLanding = () => {
    const blurbs = [
        'Unlock the Power of Your Past. Explore, Reflect, and Transform with Savemypast. Start your journey to a more peaceful and joyful future by discovering the stories that shaped you. Answer thought-provoking prompts and embark on a unique path of self-discovery today.',
        "Capture Your Life's Moments. Reflect on Your Wisdom. Savemypast is your canvas to paint the story of your life. From cherished memories to lessons learned, every experience matters. Create an account and together we'll weave the tapestry of your personal history.",

        'When you were a child, did you ever experience any especially memorable interactions with your grandparents that you still reflect on today? How has this impacted your career or family life today?',
    ];

    return (
        <>
            <section className="flex flex-col md:gap-4 gap-2">
                <h1 className="text-3xl md:text-5xl text-center mx-4">
                    How would you like to remember?
                </h1>
                <article className="flex flex-wrap m-4 gap-4 justify-center">
                    <p className="first-line:text-slate-900 first-line:text-lg first-line:font-bold rounded-lg ring-2 ring-blue-200 p-4 max-w-md text-justify">
                        {blurbs[0]}
                    </p>
                    <p className="first-line:text-slate-900 first-line:text-lg first-line:font-bold rounded-lg ring-2 ring-blue-200 p-4 max-w-md text-justify">
                        {blurbs[1]}
                    </p>
                </article>
                <section className="flex flex-wrap bg-slate-100 p-4 md:h-64 gap-4 ring-blue-200 ring-2">
                    <h1 className="m-auto w-full text-center md:text-4xl text-2xl text-slate-600">
                        Answer prompts such as...
                    </h1>
                    <h1 className="m-auto text-lg text-center max-w-4xl">
                        {blurbs[2]}
                    </h1>
                </section>
                <section className="w-full p-16 md:p-1"></section>
                <section className="fixed md:relative bottom-0 w-full flex justify-center md:justify-around p-4 gap-24 bg-white ring-2 ring-blue-200 md:ring-transparent">
                    <Link to="/register">
                        <Button variant="contained">Register</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="contained">Login</Button>
                    </Link>
                </section>
            </section>
        </>
    );
};

export default WelcomeLanding;
