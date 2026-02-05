import {isPlayerOnGround} from "./physics.js";

export const getCurrentJumpTicks = (player, isHoldingJump, physics, floorAtPlayer) => {
    if (isPlayerOnGround(player, floorAtPlayer)) return 0;
    if (isHoldingJump) return player.jumpTicks + 1;
    return physics.JUMP_TICKS_EXCEEDED_VALUE;
};

export const isDoingJumpThatIsSustainable = (isHoldingJump, jumpTicks, sustainableJumpTicksLimit) => isHoldingJump && jumpTicks < sustainableJumpTicksLimit;

export const isPlayerStartingJump = (player, isHoldingJump, floorAtPlayer) => isPlayerOnGround(player, floorAtPlayer) && isHoldingJump;
