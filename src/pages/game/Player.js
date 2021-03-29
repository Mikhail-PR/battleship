class Player {
    constructor(name) {
        if (name) {
            this.name = name;
            this.isAi = false;
        } else {
            this.name = 'AI';
            this.isAi = true;
        }
    }
}

export default Player;