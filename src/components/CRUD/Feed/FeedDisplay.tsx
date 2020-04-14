import React from 'react';
import Votes from '../Votes/Votes';
import Comments from '../Comments/Comments';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto';

let cardHeight = 'auto';
let cardWidth = 250;
let imageHeight = 200;
let imageWidth = cardWidth;

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgb(33,33,33)',
        color: 'white',
        textAlign: 'center'
    },
    memeContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        height: cardHeight,
        width: cardWidth,
        backgroundColor: 'white',
        textAlign: 'center',
        margin: '10px',
        color: 'rgb(33,33,33)',
        border: 'thin solid white'
    },
    image: {
        height: imageHeight,
        width: imageWidth,
        // maxWidth: '100%',
        // maxHeight: 200,
        objectFit: 'fill'
    },
    vote: {
        textAlign: 'center',
        flexDirection: 'column'
    },
    button: {
        color: 'blue' // icon color will override this, also changes color of animation
    }
})

type AcceptedProps = {
    sessionToken?: string | null,
    username?: string | null,
    memes: any[],
    commentModal: boolean,
    closeCommentModal: (e: any) => void,
    openCommentModal: (e: any) => void
}

const FeedDisplay = ({ sessionToken, username, memes, commentModal, closeCommentModal, openCommentModal }: AcceptedProps) => {

    const classes = useStyles();

    const displayMemes = (memes: object[]) => {

        memes.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));

        return memes.map((meme: any, index: number) => {
            console.log(meme.comments)
            return (
                <Card key={index} className={classes.card}>
                    <CardActionArea onClick={(e) => openCommentModal(e)}>
                        <CardMedia className={classes.image} image={meme.url} />
                        <CardContent>
                            <Typography variant="h6">{meme.caption}</Typography>
                            <Typography variant="body2"><i>posted by {meme.username}</i></Typography>
                            <br />
                            <Typography variant="body2"><p>{meme.comments[0] ? meme.comments[0].comment : 'no comments yet, be the first to comment:'}</p></Typography>
                            {commentModal ? <Comments sessionToken={sessionToken} closeCommentModal={closeCommentModal} memeId={meme.id} /> : null}
                        </CardContent>
                    </CardActionArea>
                    <Votes voteCount={meme.voteCount} memeId={meme.id} />
                </Card>
            )
        })
    }

    return (
        <div className={classes.root}>
            {sessionToken ? <h3 style={{ color: 'white' }}>{`Welcome Back ${username}!`}</h3> : <h2 style={{ color: 'white' }}>SupreMemes</h2>}

            <div className={classes.memeContainer}>
                {displayMemes(memes)}
            </div>
        </div>
    )
}

export default FeedDisplay;