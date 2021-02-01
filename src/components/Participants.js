import React, { Component } from 'react';
import { CallRecordings } from './CallRecordings';
import {CallerDetails} from './CallerDetails';

export class Participants extends Component {
    static displayName = Participants.name;

    constructor(props) {
        super(props);
        this.state = { data: [], loading: true, conferenceId: props.conferenceId };

        fetch('api/participants/?conferenceId=' + this.props.conferenceId)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ data: data, loading: false });
            });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            fetch('api/participants/?conferenceId=' + this.props.conferenceId)
                .then(response => response.json())
                .then(data => {
                    this.setState({ data: data, loading: false });
                });
        }, 2000);
    }

    static renderParticipants(info) {
  
        function updateCall(callSid)  {
            fetch("/api/calls/update?callSid=" + callSid + "&actionUrl=")
             .then(function(response) {
                console.log("response: ", response)
             }).catch(function() {
                console.log("error");
             });
        }

        function updateConference(conferenceId, participantId, cmd, coachSid)  {
            fetch("/api/conferences/update?conferenceId=" + conferenceId + "&participantId=" + participantId + "&cmd=" + cmd + "&coachSid=" + coachSid)
             .then(function(response) {
                console.log("response: ", response)
             }).catch(function() {
                console.log("error");
             });
        }

        function supervisorControls(participant){

            if(participant.coaching && participant.muted){
                return (
                    <div>
                        <strong>Supervisor Controls:</strong>
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "barge", "")}}>[Barge]</span> 
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "monitor", "")}}><strong>[Monitor]</strong></span> 
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "coach", "")}}>[Coach]</span>
                    </div>    
                )
            }else if(!participant.coaching && !participant.muted){
                return (
                    <div>
                        <strong>Supervisor Controls:</strong>
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "barge", "")}}><strong>[Barge]</strong></span> 
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "monitor", "")}}>[Monitor]</span> 
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "coach", "")}}>[Coach]</span>
                    </div>    
                )
            }else if(participant.coaching && !participant.muted){
                return (
                    <div>
                        <strong>Supervisor Controls:</strong>
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "barge", "")}}>[Barge]</span> 
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "monitor", "")}}>[Monitor]</span> 
                        <span onClick={()=>{updateConference(participant.conference_sid, participant.call_sid, "coach", "")}}><strong>[Coach]</strong></span>
                    </div>    
                )
            }
            

            return "";
        }

        
  
        return (
           <div>
            {
                info.participants
                .map((participant) => { 
                    return (
                        <div>
                            <CallerDetails 
                                conferenceId={participant.conference_sid}
                                participantId={participant.call_sid}
                            />                          
                            <p>
                            <div>conference_sid: {participant.conference_sid}</div>
                            <div>call_sid: {participant.call_sid} </div>
                            <div>coaching: {participant.coaching.toString()} </div>
                            <div>call_sid_to_coach: {participant.call_sid_to_coach} </div>
                            <div>muted: {participant.muted.toString()} </div>
                            <div>hold: {participant.hold.toString()} </div>
                            <div>end_conference_on_exit: {participant.end_conference_on_exit.toString()} </div>
                            <br />
                            <strong>Call Actions:</strong><span onClick={()=>{updateCall(participant.call_sid)}}>[Rick Roll]</span> <span>[Transfer]</span> 
                            { supervisorControls(participant) }
                            </p>

                            <p>
                                <div><CallRecordings conferenceId={participant.conference_sid} participantId={participant.call_sid} /></div>
                            </p>

                            <hr />
                        </div>
                    )
                })
            }
          </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Participants.renderParticipants(this.state.data);

        return (
            <div>
                <strong>Participants</strong>
                {contents}
            </div>
        );
    }
}