// Notes:
// The database data should be loaded in the root component:
// - see _app.js
// so it should be done in the <Layout> component
// However, we'd then have to pass the data as a property down through
// the component tree . . . more prop drilling!
// So this is a temporary hack . . . means you have to visit the home page 
// in order to get the database data.
// We will fix this and provide a proper solution when we use the Contat API.

import MeetupList from '../components/meetups/MeetupList'
import { useState, useEffect } from "react";

function HomePage() {
    const [meetups, setMeetups] = useState(null);

    useEffect(() => {
        getAllMeetings()
    }, []);

    async function getAllMeetings() {
        const response = await fetch('/api/get-meetings', {
            method: 'POST',
            body: JSON.stringify({meetups: 'all'}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await response.json();
        setMeetups(data.meetings);
    }

    if (meetups == null) {
        return null
    } else {
    return <MeetupList meetups={meetups} />
    }
}

export default HomePage;