import React from 'react';

import { Button } from 'reactstrap';

import AdminMemesDisplay from './AdminMemesDisplay';

type AdminProps = {
    sessionToken: string | null,
    username: string | null,
    userRole: string | null
}

type AdminState = {
    allMemes: any[],
    showAllMemes: boolean,
    displayCommentModal: boolean,
    displayCommentMemeId: string,
    displayCommentMemeComments: any[]
}

export default class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props)

        this.state = {
            allMemes: [],
            showAllMemes: false,
            displayCommentModal: false,
            displayCommentMemeId: '',
            displayCommentMemeComments: []
        }
    }

    getAllMemes() {
        this.setState({ showAllMemes: true })

        fetch('https://team6-red-badge-meme-server.herokuapp.com/feed/all', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    allMemes: json
                });
            })
    }

    openDisplayCommentModal = (memeId: string, memeComments: any[]) => {
        this.setState({
            displayCommentModal: true,
            displayCommentMemeId: memeId,
            displayCommentMemeComments: memeComments
        })
    }

    closeDisplayCommentModal = () => {
        this.setState({ displayCommentModal: false })
    }

    getAllUsers() {
        this.setState({ showAllMemes: false })

        // fetch request to see all user profiles (need to make an endpoint for this though)
    }

    render() {

        return (
            <div style={{ margin: 50 }}>
                <h3 style={{ color: 'white' }}>Hello Admin</h3>
                <p>"With great power, comes great responsibility" ~ Uncle Ben - SpiderMan.</p>
                <br />
                <p>How do you want to abuse your power today, {this.props.username}?</p>

                <hr style={{ borderColor: 'white' }} />
                <div>
                    <Button color='info' disabled={this.state.showAllMemes} onClick={() => this.getAllMemes()}>view all posts</Button>
                </div>
                <br />
                <div>
                    <Button color='info' onClick={() => this.getAllUsers()}>view all users</Button>
                </div>
                {
                    this.state.showAllMemes ?
                        <div>
                            <hr style={{ borderColor: 'white' }} />
                            <AdminMemesDisplay
                                userRole={this.props.userRole}
                                allMemes={this.state.allMemes}
                                sessionToken={this.props.sessionToken}
                                getAllMemes={this.getAllMemes.bind(this)}
                                commentModal={this.state.displayCommentModal}
                                openCommentModal={this.openDisplayCommentModal(this.state.displayCommentMemeId, this.state.displayCommentMemeComments)}
                                closeCommentModal={this.closeDisplayCommentModal}
                            />
                        </div> : null
                }

            </div>
        )
    }
}