export const getInitialPlayer = (initialPlayerHeight) => ({
    position: {
        x: 2,
        y: initialPlayerHeight
    },
    velocity: 0,
    jumpTicks: 0,
    collided: false
});

export const getPlayer = (player, floorAtPlayer, jumpTicks, velocity) => ({
    ...player,
    jumpTicks: jumpTicks,
    position: {...player.position, y: floorAtPlayer},
    velocity: velocity
});