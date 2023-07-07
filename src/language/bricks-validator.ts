import { ValidationAcceptor, ValidationChecks } from 'langium';
import { BricksAstType, Build } from './generated/ast';
import type { BricksServices } from './bricks-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: BricksServices) {

    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.BricksValidator;
    const checks: ValidationChecks<BricksAstType> = {
        Build: validator.checkBuildMode
    };
    registry.register(checks, validator);
}

const buildModeRegex : RegExp = /^[campCAMP]+$/;

/**
 * Implementation of custom validations.
 */
export class BricksValidator {

    checkBuildMode(build: Build, accept: ValidationAcceptor): void {
        if (build.buildMode) {
            if (!buildModeRegex.test(build.buildMode)) {
                accept('error', 'Build mode is a combination of any of the following characters: C(olor), A(lternates), M(olds), and P(rints).', { node: build, property: 'buildMode' });
            }
        }
    }

}
