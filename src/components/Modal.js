import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import '../assets/css/box.css'

function ModalTest(props) {

    const { isOpen, dismissHandler, details } = {...props}
    // Details Coming from Props related to each item

    //Permission Data
    const admin = details.permissions.admin ? "True" : "False"
    const pull = details.permissions.pull ? "True" : "False"
    const push = details.permissions.push ? "True" : "False"

    //License Data
    const License = details.license

    //Owner Data
    const Owner = details.owner
    const siteAdmin = details.owner.site_admin ? "True" : "False"

    return (
        <div>
            <Modal show={isOpen} >
                <Modal.Header> {details.name}</Modal.Header>

                <Modal.Body>
                    <div >Permission :
                        <div className="modalData">
                            <div> Admin : {admin}</div>
                            <div> Push : {push}</div>
                            <div> Pull : {pull}</div>
                        </div>

                    </div>
                    <div >License :
                        <div className="modalData">
                            <div> Key : {License.key}</div>
                            <div> Name : {License.name}</div>
                            <div> SPDX_ID : {License.spdx_id}</div>
                            <div> URL: {License.url}</div>
                            <div> Node ID: {License.node_id}</div>
                        </div>
                    </div>

                    <div >Owner :
                        <div className="modalData">
                            <div> Login : {Owner.login}</div>
                            <div> ID : {Owner.id}</div>
                            <div> Avatar URL : {Owner.avatar_url}</div>
                            <div> Gravatar URL: {Owner.gravatar_url}</div>
                            <div> Node ID: {Owner.node_id}</div>
                            <div> URL : {Owner.url}</div>
                            <div> HTML URL: {Owner.html_url}</div>
                            <div> Followers URL: {Owner.followers_url}</div>
                            <div> Following URL: {Owner.following_url}</div>
                            <div> Gists URL: {Owner.gists_url}</div>
                            <div> Starred URL: {Owner.starred_url}</div>
                            <div> Subscriptions URL :{Owner.subscriptions_url}</div>
                            <div> Organizations URL: {Owner.organizations_url} </div>
                            <div> Repos URL: {Owner.repos_url} </div>
                            <div> Events URL: {Owner.events_url} </div>
                            <div> Received Events URL: {Owner.received_events_url} </div>
                            <div> Type: {Owner.type}</div>
                            <div> Site Admin: {siteAdmin}</div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={dismissHandler}>
                        OK
                    </Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default ModalTest