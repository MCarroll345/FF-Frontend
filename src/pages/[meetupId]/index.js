import MeetupDetail from '../../components/meetups/MeetupDetail'
import { useRouter } from 'next/router';

function MeetupDetails() {
    return (
        <MeetupDetail
            image='https://www.planetware.com/photos-large/SEY/best-islands-maldives.jpg'
            title='Some address, Barna, Galway'
            description='First meetup description' >
        </MeetupDetail >
    )
}

export default MeetupDetails;