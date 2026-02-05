import {getCurrentJumpTicks, isDoingJumpThatIsSustainable, isPlayerStartingJump} from "./jump.js";
import {getConstrainedYValue, isYAtFloorOrCeiling} from "../field/physics.js";
import {getPlayer} from "./player.js";

export const isPlayerOnGround = (player, floorAtPlayer) => player.position.y <= floorAtPlayer;

const getPlayerUpwardForce = (isHoldingJump, jumpTicks, physics) => {
    if (isDoingJumpThatIsSustainable(isHoldingJump, jumpTicks, physics.SUSTAINABLE_JUMP_TICKS_LIMIT)) return physics.SUSTAINED_JUMP_FORCE;
    return 0;
};

const getNewVelocity = (constrainedY, height, newVelocity) => {
    if (isYAtFloorOrCeiling(constrainedY, height)) return 0;
    return newVelocity;
};

const playerShouldFollowFloor = (isHoldingJump, player, floorAtPlayer) => !isHoldingJump && isPlayerOnGround(player, floorAtPlayer);

const playerIsAtOrBelowFloor = (constrainedY, floorAtPlayer) => constrainedY <= floorAtPlayer;

const getVelocity = (player, physics, upwardForce, boost) => player.velocity - physics.GRAVITY + upwardForce + boost;

const getNextY = (player, newVelocity) => player.position.y + newVelocity;

export const calculatePlayerPhysics = (player, isHoldingJump, height, physics, floorAtPlayer) => {

    if (playerShouldFollowFloor(isHoldingJump, player, floorAtPlayer)) {
        return getPlayer(player, floorAtPlayer,0,0);
    }

    const jumpTicks = getCurrentJumpTicks(player, isHoldingJump, physics, floorAtPlayer);
    const upwardForce = getPlayerUpwardForce(isHoldingJump, jumpTicks, physics);
    const boost = isPlayerStartingJump(player, isHoldingJump, floorAtPlayer) ? physics.INITIAL_JUMP_FORCE : 0;

    const newVelocity = getVelocity(player, physics, upwardForce, boost);
    const nextY = getNextY(player, newVelocity);
    const constrainedY = getConstrainedYValue(height, nextY);

    if (playerIsAtOrBelowFloor(constrainedY, floorAtPlayer)) {
        return getPlayer(player, floorAtPlayer, jumpTicks, 0);
    }

    return getPlayer(player, constrainedY, jumpTicks, getNewVelocity(constrainedY, height, newVelocity));
};

export const isPlayerCollided = field => field.player.collided;
