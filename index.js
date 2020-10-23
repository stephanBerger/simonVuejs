const vm = new Vue({

    el:'#app',
    data:{
        hautGauche:false,
        hautDroite:false,
        basGauche:false,
        basDroite:false,
        sequence:[],
        tmp:[],
        squareMapping:['hautGauche','hautDroite','basGauche','basDroite'],
        score:0,
        meilleurScore:0
    },
    methods:{
        allGray(){
            this.hautGauche = false;
            this.hautDroite = false;
            this.basGauche = false;
            this.basDroite = false;
        },
        addNewElemToSequence(){
            this.sequence.push(this.squareMapping[Math.floor(Math.random() * 4)]);
            this.tmp = this.sequence.slice();
        },
        newGame(){
            this.score = 0;
            this.sequence = [];
            this.nextTurn();

        },
        nextTurn(){
            this.score+=this.sequence.length;
            this.addNewElemToSequence();
            this.allGray();
            this.playSequence(this.tmp[0]);
        },
        playSequence(instruction){
            this[instruction] = true;
            setTimeout(function(){
                vm.allGray();
                vm.tmp.shift();
                if(vm.tmp[0]){
                    setTimeout(function(){
                        vm.playSequence(vm.tmp[0]);
                    },400);
                } else {
                    vm.tmp = vm.sequence.slice();
                }
            },400);
        },
        instruction(instruction){
            if(instruction === this.tmp[0]){
                this[instruction] = true;
                setTimeout(function(){
                    vm.allGray();
                    vm.tmp.shift();
                    if(!vm.tmp[0]){
                        setTimeout(() => {
                            vm.nextTurn();
                        }, 400);
                    }
                },400)
            } else {
                alert(`Perdu!!, Votre score est de: ${this.score}`);
                if(this.score > this.meilleurScore){
                    this.meilleurScore = this.score;
                }
                this.score = 0;
                this.sequence = [];
                this.tmp = []
            }
        }
    }
})