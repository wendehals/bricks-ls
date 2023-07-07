import { ValidationAcceptor, ValidationChecks } from 'langium';
import { BricksAstType, Build, Model } from './generated/ast';
import type { BricksServices } from './bricks-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: BricksServices) {

    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.BricksValidator;
    const checks: ValidationChecks<BricksAstType> = {
        Model: validator.checkIdentity,
        Build: validator.checkBuildMode
    };
    registry.register(checks, validator);
}

const buildModeRegex : RegExp = /^[campCAMP]+$/;

/**
 * Implementation of custom validations.
 */
export class BricksValidator {

    checkIdentity(model: Model, accept: ValidationAcceptor): void {
        let ids = new Set<string>()
        for (var cmd of model.commands){
            if ("name" in cmd) {
                if (ids.has(cmd.name)) {
                    accept('error', 'The variable name is not unique.', { node: cmd, property: 'name' });    
                } else {
                    ids.add(cmd.name)
                }
            }
        }
    }

    checkBuildMode(build: Build, accept: ValidationAcceptor): void {
        if (build.buildMode) {
            if (!buildModeRegex.test(build.buildMode)) {
                accept('error', 'Build mode is a combination of any of the following characters: C(olor), A(lternates), M(olds), and P(rints).', { node: build, property: 'buildMode' });
            }
        }
    }

}
