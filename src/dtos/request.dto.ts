import {updatedImageDns} from './dto.utils'

export class Asset {
    id: string;
    title: string;
    description: string;
    broadcastStartTime: string;
    broadcastEndTime: string;
    duration: number;
    image: string;
    match?: Match;

    constructor(input:Asset){
        this.id = input.id;
        this.broadcastStartTime = input.broadcastStartTime;
        this.description = input.description;
        this.duration = input.duration;
        this.image = updatedImageDns(input.image);
        this.title = input.title;
        if(input.match){
            this.match = new Match(input.match);
        }
    }
}

class Match {
    id: string;
    homeTeam: Team;
    awayTeam: Team;

    constructor(input:Match){
        this.id = input.id;
        this.homeTeam = new Team(input.homeTeam);
        this.awayTeam = new Team(input.awayTeam);
    }
}
class Team {
    id: string;
    name: string;
    image: string;

    constructor(input:Team){
        this.id = input.id;
        this.name = input.name;
        this.image = updatedImageDns(input.image);
    }
}
