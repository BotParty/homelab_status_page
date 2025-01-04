let previousShadowMap = false;

// ref for lumens: http://www.power-sure.com/lumens.htm
const bulbLuminousPowers = {
    '110000 lm (1000W)': 110000,
    '3500 lm (300W)': 3500,
    '1700 lm (100W)': 1700,
    '800 lm (60W)': 800,
    '400 lm (40W)': 400,
    '180 lm (25W)': 180,
    '20 lm (4W)': 20,
    'Off': 0
};

// ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
const hemiLuminousIrradiances = {
    '0.0001 lx (Moonless Night)': 0.0001,
    '0.002 lx (Night Airglow)': 0.002,
    '0.5 lx (Full Moon)': 0.5,
    '3.4 lx (City Twilight)': 3.4,
    '50 lx (Living Room)': 50,
    '100 lx (Very Overcast)': 100,
    '350 lx (Office Room)': 350,
    '400 lx (Sunrise/Sunset)': 400,
    '1000 lx (Overcast)': 1000,
    '18000 lx (Daylight)': 18000,
    '50000 lx (Direct Sun)': 50000
};

const params = {
    shadows: true,
    exposure: 0.68,
    bulbPower: Object.keys( bulbLuminousPowers )[ 4 ],
    hemiIrradiance: Object.keys( hemiLuminousIrradiances )[ 0 ]
};

import { PointLight, HemisphereLight } from 'three';


export function setupLighting(scene) {
    console.log('setupLighting');
    const bulbLight = new PointLight( 0xffee88, 10, 100, 2 );

bulbLight.position.set( 0, 2, 0 );
				bulbLight.castShadow = true;

                scene.add( bulbLight );


    const hemiLight = new HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );
    scene.add( hemiLight );

    setInterval(() => {
        const time = Date.now() * 0.0005;

        bulbLight.position.y = Math.cos( time ) * 0.75 + 1.25;
    }, 1000);

}