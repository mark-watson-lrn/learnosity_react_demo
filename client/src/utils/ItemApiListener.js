/* eslint-disable no-undef */
import React from 'react';

export const QuizListener = (authentication) => {

    let learnosityObj = '';

    if (authentication) {

        if (typeof LearnosityItems != 'undefined') {

            learnosityObj = LearnosityItems.init(authentication, {
                readyListener() {
                    console.log('👍🏼 <<< Learnosity Items API is ready >>> 🧘🏼');
                },
                errorListener(err) {
                    console.log('error', err);
                }
            })
        }

        if (typeof LearnosityReports != 'undefined') {

            learnosityObj = LearnosityReports.init(authentication, {
                readyListener() {
                    console.log('👍🏼 <<< Learnosity Reports API is ready >>> 🧘🏼');
                },
                errorListener(err) {
                    console.log('error', err);
                }
            })
        }

    }

    return (
        <>
            {learnosityObj}
        </>
    )
}
