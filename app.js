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
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.playerHealth + '%' };
    },
    playerBarStyles() {
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
    attackMonster() {
      this.currentRound++;
      const attackValue = randonValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = randonValue(7, 12);
      this.playerHealth -= attackValue;
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = randonValue(10, 25);
      this.monsterHealth -= attackValue;
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
      this.attackPlayer();
    },
  },
});

app.mount('#game');
