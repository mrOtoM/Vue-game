function randonValue(min, max) {
  return Math.trunc(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    useSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(hodnota) {
      if (hodnota <= 0 && this.monsterHealth <= 0) {
        // remiza
        this.winner = 'draw';
      } else if (hodnota <= 0) {
        // hrac prehral
        this.winner = 'monster';
      }
    },
    monsterHealth(hodnota) {
      if (hodnota <= 0 && this.playerHealth <= 0) {
        // remiza
        this.winner = 'draw';
      } else if (hodnota <= 0) {
        //monster prehral
        this.winner = 'player';
      }
    },
  },
  methods: {
    startGame() {
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.currentRound = 0),
        (this.winner = null);
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = randonValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', attackValue);
    },
    attackPlayer() {
      const attackValue = randonValue(7, 12);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = randonValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'special-attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = randonValue(5, 17);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    surrended() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
