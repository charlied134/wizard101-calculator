/*

calculate.js

This file contains the code to calculate incoming and outgoing damage multipliers
for pvp and pve based on player stats.

Author: Alex N, Drew K
Date created: 04/17/2021
Date updated: 04/17/2021

*/

// inputs
const dmgField = document.getElementById("dmg");
const resField = document.getElementById("res");
const prcField = document.getElementById("prc");

// outputs
const pveOut = document.getElementById("pve-out");
const pveIn = document.getElementById("pve-in");
const pveTot = document.getElementById("pve-tot");

const pvpOut = document.getElementById("pvp-out");
const pvpIn = document.getElementById("pvp-in");
const pvpTot = document.getElementById("pvp-tot");

// buttons
const calculate = document.getElementById("calc");
const reset = document.getElementById("reset");
const bread = document.getElementById("bread");

// scalars
const dmgL = [2, 2];
const dmgK0 = [190, 140];
const dmgN0 = [-40, -40];

const resL = [1.25, 0.7];
const resK0 = [120, 65];
const resN0 = [-20, -15];

// calculate values onclick of the calculate button
calculate.onclick = function () {

    // character stats
    damage = Number(dmgField.value);
    resist = Number(resField.value);
    pierce = Number(prcField.value);

    if (damage >= 0 && resist >= 0 && pierce >= 0) {

        // outgoing/incoming pve
        let a = Math.max(1 + magic(damage, dmgL[0], dmgK0[0], dmgN0[0]), 1);
        let b = Math.max(1 - magic(Math.max(resist - pierce, 0), resL[0], resK0[0], resN0[0]), 0);

        // set outgoing to text fields
        pveOut.value = Math.max(a, 1).toFixed(5);
        pveIn.value = Math.max(b, 0).toFixed(5);
        pveTot.value = Math.max(a * b, 0).toFixed(5);

        // outgoing/incoming pvp
        a = Math.max(1 + magic(damage, dmgL[1], dmgK0[1], dmgN0[1]), 1);
        b = Math.max(1 - magic(Math.max(resist - pierce, 0), resL[1], resK0[1], resN0[1]), 0);

        // set outgoing to text fields
        pvpOut.value = a.toFixed(5);
        pvpIn.value = b.toFixed(5);
        pvpTot.value = (a * b).toFixed(5);

    }

}

// reset all text fields onclick of reset button
reset.onclick = function () {

    let fields = document.querySelectorAll(".field");

    for (let i = 0; i < fields.length; i++) {
        fields[i].value = "";
    }

    let box = document.querySelector(".bread-box");

    while (box.firstChild) {
        box.removeChild(box.firstChild);
    }

}

// bread
bread.onclick = function () {

    let box = document.querySelector(".bread-box");

    img = document.createElement("IMG");
    img.src = "images/bread.jpg";

    box.appendChild(img);

}

// shh this is a secret... dont look
function magic(x, L, k0, n0) {

    if (x <= k0 + n0)
        return x / 100;

    let k = 0;
    let n = 0;

    if (k0 !== 0)
        k = Math.log((100 * L) / ((100 * L) - k0)) / k0;
    else
        k = 1 / 100 * L

    n = Math.log(1 - (k0 + n0) / (100 * L)) + k * (k0 + n0);

    return L - (L / Math.pow(Math.E, k * x - n));

}