import MeetupDetail from '../../components/meetups/MeetupDetail'
import { useRouter } from 'next/router';

function MeetupDetails() {
    const router = useRouter();
    console.log("I'm a hard coded page; I'm supposed to be " + router.query.meetupId)
    return (
        <MeetupDetail
            image='https://www.planetware.com/photos-large/SEY/best-islands-maldives.jpg'
            title='Some address, Barna, Galway'
            description='First meetup description' >
        </MeetupDetail >
    )
}

export default MeetupDetails;