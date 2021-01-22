module.exports.TicTacToe = class {
    constructor(player1, player2) {
        this.Player1 = [player1, "🇽"]
        this.Player2 = [player2, "🇴"]
        this.Table = [
            [["⬜"], ["⬜"], ["⬜"]],
            [["⬜"], ["⬜"], ["⬜"]],
            [["⬜"], ["⬜"], ["⬜"]]
        ]
        this.Available = 8
    }
    Move(x, y, player) {
        var player2move = null
        if (player == this.Player1[0]){player2move = this.Player1}else{player2move=this.Player2}
        this.Table[x][y] = player2move[1]
        this.Available -= 1
        return true
    }
    CheckForWinner() {
        let winner = null;
        // Horisontaalne
        for (let i = 0; i < 3; i++){
            if (this.Table[i][0] == this.Table[i][1] && this.Table[i][1] == this.Table[i][2]){
                if (this.Player1[1] == this.Table[i][0]){
                    winner = this.Player1[0]
                }else{
                    winner = this.Player2[0]
                }
                break
            }
        }
        //Vertikaalne
        for (let i = 0; i < 3; i++){
            if (this.Table[0][i] == this.Table[1][i] && this.Table[1][i] == this.Table[2][i]){
                if (this.Player1[1] == this.Table[0][i]){
                    winner = this.Player1[0]
                }else{
                    winner = this.Player2[0]
                }
                break
            }
        }
        //Diagonaal
        if (this.Table[0][0] == this.Table[1][1] && this.Table[1][1] == this.Table[2][2]){
            if (this.Player1[1] == this.Table[0][0]){
                winner = this.Player1[0]
            }else{
                winner = this.Player2[0]
            }
        }
        if (this.Table[0][2] == this.Table[1][1] && this.Table[1][1] == this.Table[2][0]){
            if (this.Player1[1] == this.Table[0][2]){
                winner = this.Player1[0]
            }else{
                winner = this.Player2[0]
            }
        }
        if (this.Available == 0){
            winner == "Tie"
        }
        return winner
    }
}