const gap = 0.10;
const baseline = 0.2 + Math.random() * 0.6;

const mu = [baseline, baseline + gap * Math.sign(Math.random() - 0.5)];

var r = 0;
var userout = 0;
var counter = [0, 0];
var rewards = [0, 0];

function getReward(mu) {
  if (Math.random() < mu){
    return 1;
  }
  return 0;
}

function runUCB(n, mu) {
  const sigma = 0.5;
  
  var out = 0;
  var counter = [1, 1];
  var rewards = [getReward(mu[0]), getReward(mu[1])];

  for (t = 2; t < n; t++) {
    var mean = 0;
    var action = 0;
    var pseudo = 0;
    var maxima = 0;
    
    for (k = 0; k < 2; k++) {
      mean = rewards[k]/counter[k];
      pseudo = mean + Math.sqrt(sigma * Math.log(n) / counter[k])
      
      if (pseudo > maxima) {
        action = k;
        maxima = pseudo;
      }
    }
    
    out = out + mu[action];
    counter[action] = counter[action] + 1;
    rewards[action] = rewards[action] + getReward(mu[action]);
    
  }

  return out.toFixed(2);
}

document.getElementById("T1").onclick = function () {
  r = getReward(mu[0]);

  userout = userout + mu[0];
  counter[0] = counter[0] + 1;
  rewards[0] = rewards[0] + r;

  document.getElementById("N1").innerText = "Number of Plays: " + counter[0];
  document.getElementById("R1").innerText = "Cumulative Reward: " + rewards[0];
};

document.getElementById("T2").onclick = function () {
  r = getReward(mu[1]);

  userout = userout + mu[1];
  counter[1] = counter[1] + 1;
  rewards[1] = rewards[1] + r;

  document.getElementById("N2").innerText = "Number of Plays: " + counter[1];
  document.getElementById("R2").innerText = "Cumulative Reward: " + rewards[1];
};

document.getElementById("reveal").onclick = function () {
  document.getElementById("user-performance").innerText = "User Performance: " + userout.toFixed(2);
  document.getElementById("T1-expectation").innerText = "Expected Reward for Treatment 1: " + mu[0].toFixed(2);
  document.getElementById("T2-expectation").innerText = "Expected Reward for Treatment 2: " + mu[1].toFixed(2);

  const n = counter[0] + counter[1];
  const policy = document.getElementById("policy-selection").value;

  var policyout = "NotImplementedError";

  if (policy == "UCB") {
    policyout = runUCB(n, mu);
  }

  document.getElementById("policy-performance").innerText = "Policy Performance: " + policyout;
};