import React, { Component } from 'react';
import './MyAccount.css';

import MemeEdit from './MemeEdit';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


type AcctState = {
    userMemes: any[],
    editModal: boolean,
    editMemeId: string,
    editMemeCaption: string
}

type AcceptedProps = {
    sessionToken: string | null,
    username: string | null
}

class MyAccount extends Component<AcceptedProps, AcctState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            userMemes: [],
            editModal: false,
            editMemeId: '',
            editMemeCaption: ''
        }
    }

    checkSessionToken(token: string | null): string {
        if (token === null) {
            return 'no token'
        } else {
            return token
        }
    }

    componentDidMount() {
        this.fetchUserMemes();
    }

    fetchUserMemes() {
        fetch('https://team6-red-badge-meme-server.herokuapp.com/mymemes/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.checkSessionToken(this.props.sessionToken)
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userMemes: json
                });
            })
    }

    MemeDisplay(memes: any[]) {

        memes.sort((a: any, b: any) => (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0));

        return memes.map((meme: any, index: number) => {
            return (
                <Card key={index} className='card'>
                    <CardActionArea>
                        <CardMedia className='image' image={meme.url} />
                        <CardContent>
                            <Typography variant='h6'>{meme.caption}</Typography>
                            <Typography variant='body1'>Votes: {meme.voteCount}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className='buttonContainer'>
                        <EditIcon id='button' onClick={e => this.openEditModal(e, meme.id, meme.caption)} />
                        <DeleteIcon id='button' onClick={e => this.deleteMeme(meme.id)} />
                    </CardActions>
                </Card>
            )
        })
    }

    openEditModal(e: any, memeId: string, memeCaption: string) {
        this.setState({
            editModal: true,
            editMemeId: memeId,
            editMemeCaption: memeCaption
        });
    }

    closeEditModal(e: any) {
        this.setState({
            editModal: false,
            editMemeId: '',
            editMemeCaption: ''
        });
    }

    deleteMeme(memeId: string) {
        fetch(`https://team6-red-badge-meme-server.herokuapp.com/mymemes/delete/${memeId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.checkSessionToken(this.props.sessionToken)
            })
        })
            .then(res => {
                this.fetchUserMemes();
            })
    }

    render() {
        return (
            <div className='myMemes'>
                {this.props.username !== '' ? <h2 style={{ color: 'white' }}>{this.props.username}'s Account</h2> : <h2 style={{ color: 'white' }}>My Account</h2>}
                <i>these are all the memes you have posted so far</i>
                <br />
                <br />
                <br />
                <div className='memeContainer'>
                    {this.state.userMemes.length === 0 ? <h4 style={{ color: 'white' }}>You haven't posted any memes yet!</h4> : this.MemeDisplay(this.state.userMemes)}
                </div>
                {this.state.editModal ?
                    <MemeEdit
                        sessionToken={this.props.sessionToken}
                        memeId={this.state.editMemeId}
                        memeCaption={this.state.editMemeCaption}
                        closeEditModal={this.closeEditModal.bind(this)}
                        fetchUserMemes={this.fetchUserMemes.bind(this)}
                    />
                    : null}
            </div>
        )
    }
}

export default MyAccount
