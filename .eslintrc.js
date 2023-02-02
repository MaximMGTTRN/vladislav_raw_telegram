const changedEslintRecommendedRules = {
  'for-direction': 'off',
  'no-constant-condition': ['error', { checkLoops: false }],
};

const possibleErrorsRules = {
  'no-await-in-loop': ['error'],
  'no-promise-executor-return': ['error'],
  'no-template-curly-in-string': ['error'],
  'no-unreachable-loop': ['error'],
  'no-unsafe-optional-chaining': ['error'],
};

const bestPracticesRules = {
  'array-callback-return': ['error'],
  'consistent-return': ['error'],
  curly: ['error', 'multi-line'],
  'default-case-last': ['error'],
  'default-param-last': ['error'],
  'dot-location': ['error', 'property'],
  'dot-notation': ['error'],
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'grouped-accessor-pairs': ['error', 'getBeforeSet'],
  'no-caller': ['error'],
  'no-constructor-return': ['error'],
  'no-else-return': ['error'],
  'no-empty-function': ['warn'],
  'no-eval': ['error'],
  'no-extend-native': ['error'],
  'no-extra-bind': ['error'],
  'no-floating-decimal': ['error'],
  'no-implied-eval': ['error'],
  'no-invalid-this': ['error'],
  'no-labels': ['error'],
  'no-lone-blocks': ['error'],
  'no-multi-spaces': ['error'],
  'no-new-func': ['error'],
  'no-new-wrappers': ['error'],
  'no-proto': ['error'],
  'no-restricted-properties': ['error'],
  'no-return-assign': ['error'],
  'no-sequences': ['error'],
  'no-throw-literal': ['error'],
  'no-unused-expressions': ['error'],
  'no-useless-call': ['error'],
  'no-useless-concat': ['error'],
  'no-useless-return': ['error'],
  'no-void': ['error'],
  'prefer-promise-reject-errors': ['error'],
  'require-await': ['error'],
  'wrap-iife': ['error', 'any'],
  yoda: ['error', 'never', { exceptRange: true }],
};

const variablesRules = {
  'init-declarations': ['error', 'always'],
  'no-restricted-globals': ['error'],
  'no-shadow': ['error'],
  'no-undefined': ['error'],
  'no-use-before-define': ['error'],
};

const suggestionsRules = {
  'array-bracket-newline': ['error', 'consistent'],
  'array-bracket-spacing': ['error', 'never'],
  'array-element-newline': ['error', 'consistent'],
  'block-spacing': ['error', 'always'],
  'brace-style': ['error', '1tbs', { allowSingleLine: true }],
  'comma-dangle': [
    'error',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
      enums: 'always-multiline',
      generics: 'always-multiline',
      tuples: 'always-multiline',
    },
  ],
  'comma-spacing': ['error'],
  'comma-style': ['error'],
  'computed-property-spacing': ['error', 'never'],
  'consistent-this': ['error', 'self'],
  'eol-last': ['error', 'always'],
  'func-call-spacing': ['error', 'never'],
  'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
  'function-call-argument-newline': ['error', 'consistent'],
  'function-paren-newline': ['error', 'consistent'],
  'implicit-arrow-linebreak': ['error', 'beside'],
  indent: [
    'error',
    2,
    {
      ignoredNodes: [
        'TemplateLiteral *',
        'TSTypeParameterInstantiation',
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      ],
      SwitchCase: 1,
    },
  ],
  'key-spacing': ['error'],
  'keyword-spacing': ['error'],
  'line-comment-position': ['error', 'above'],
  'linebreak-style': ['error', 'unix'],
  'lines-around-comment': [
    'error',
    {
      beforeBlockComment: true,
      beforeLineComment: true,
      allowBlockStart: true,
      allowBlockEnd: true,
      allowObjectStart: true,
      allowArrayStart: true,
      allowClassStart: true,
      ignorePattern: 'endregion',
    },
  ],
  'lines-between-class-members': [
    'error',
    'always',
    { exceptAfterSingleLine: true },
  ],
  'max-len': [
    'error',
    { code: 120, ignoreComments: true, ignoreTemplateLiterals: true },
  ],
  'multiline-ternary': ['error', 'always-multiline'],
  'new-parens': ['error', 'always'],
  'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
  'no-array-constructor': ['error'],
  'no-bitwise': ['error', { allow: ['^'] }],
  'no-continue': ['error'],
  'no-lonely-if': ['error'],
  'no-mixed-operators': ['error'],
  'no-multi-assign': ['error'],
  'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
  'no-nested-ternary': ['error'],
  'no-new-object': ['error'],
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'no-tabs': ['error'],
  'no-trailing-spaces': ['error'],
  'no-unneeded-ternary': ['error'],
  'no-whitespace-before-property': ['error'],
  'nonblock-statement-body-position': ['error', 'beside'],
  'object-curly-newline': [
    'error',
    {
      ObjectExpression: { minProperties: 6, consistent: true, multiline: true },
      ObjectPattern: { minProperties: 6, consistent: true, multiline: true },
      ExportDeclaration: {
        minProperties: 6,
        consistent: true,
        multiline: true,
      },
    },
  ],
  'object-curly-spacing': ['error', 'always'],
  'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
  'one-var': ['error', 'never'],
  'one-var-declaration-per-line': ['error', 'always'],
  'operator-assignment': ['error', 'always'],
  'operator-linebreak': ['error', 'before'],
  'padded-blocks': ['error', 'never'],
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: [
        'multiline-block-like',
        'multiline-const',
        'multiline-expression',
        'multiline-let',
      ],
      next: '*',
    },
    {
      blankLine: 'always',
      prev: '*',
      next: [
        'multiline-block-like',
        'multiline-const',
        'multiline-expression',
        'multiline-let',
      ],
    },
  ],
  'prefer-exponentiation-operator': ['error'],
  'prefer-object-spread': ['error'],
  'quote-props': ['error', 'as-needed'],
  quotes: ['error', 'single', { avoidEscape: true }],
  semi: ['error', 'always'],
  'semi-spacing': ['error'],
  'semi-style': ['error'],
  'space-before-blocks': ['error'],
  'space-before-function-paren': [
    'error',
    {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    },
  ],
  'space-in-parens': ['error', 'never'],
  'space-infix-ops': ['error'],
  'space-unary-ops': ['error'],
  'spaced-comment': ['error'],
  'switch-colon-spacing': ['error'],
  'template-tag-spacing': ['error', 'never'],
  'unicode-bom': ['error', 'never'],
  'wrap-regex': ['error'],
};

const ES6Rules = {
  'arrow-parens': ['error', 'always'],
  'arrow-spacing': ['error'],
  'no-duplicate-imports': ['error'],
  'no-useless-computed-key': ['error'],
  'no-useless-constructor': ['error'],
  'no-useless-rename': ['error'],
  'no-var': ['error'],
  'object-shorthand': ['error', 'always'],
  'prefer-arrow-callback': ['error'],
  'prefer-const': ['error'],
  'prefer-destructuring': [
    'error',
    {
      VariableDeclarator: { array: true, object: true },
      AssignmentExpression: { array: true, object: false },
    },
  ],
  'prefer-numeric-literals': ['error'],
  'prefer-rest-params': ['error'],
  'prefer-spread': ['error'],
  'prefer-template': ['error'],
  'rest-spread-spacing': ['error', 'never'],
  'template-curly-spacing': ['error', 'never'],
};

const importRules = {
  'import/no-extraneous-dependencies': ['error'],
  'import/first': ['error'],
  'import/order': ['error'],
  'import/newline-after-import': ['error', { count: 2 }],
  "import/no-anonymous-default-export": ["error", { "allowArray": true, "allowLiteral": true, "allowObject": true }]
};

const tsRules = {
  '@typescript-eslint/member-delimiter-style': ['error'],
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/type-annotation-spacing': ['error'],
  '@typescript-eslint/prefer-optional-chain': ['error'],
  '@typescript-eslint/naming-convention': ['error', { selector: 'typeLike', format: ['PascalCase'] }],
  '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }]
};

const tsPluginExtendedRules = [
  'brace-style',
  'comma-dangle',
  'comma-spacing',
  'default-param-last',
  'dot-notation',
  'func-call-spacing',
  'indent',
  'init-declarations',
  'keyword-spacing',
  'lines-between-class-members',
  'no-array-constructor',
  'no-dupe-class-members',
  'no-duplicate-imports',
  'no-empty-function',
  'no-extra-parens',
  'no-extra-semi',
  'no-implied-eval',
  'no-invalid-this',
  'no-loop-func',
  'no-loss-of-precision',
  'no-magic-numbers',
  'no-redeclare',
  'no-shadow',
  'no-throw-literal',
  'no-unused-expressions',
  'no-unused-vars',
  'no-use-before-define',
  'no-useless-constructor',
  'object-curly-spacing',
  'padding-line-between-statements',
  'quotes',
  'return-await',
  'semi',
  'space-before-function-paren',
  'space-infix-ops',
  'require-await',
];

const applyTsPluginExtendedRules = (rules) => {
  tsPluginExtendedRules
    .filter((ruleName) => rules[ruleName])
    .forEach((ruleName) => {
      rules[`@typescript-eslint/${ruleName}`] = rules[ruleName];
      rules[ruleName] = 'off';
    });

  return rules;
};


module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [{ files: ['*.ts', '*.js'] }],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import'],
  ignorePatterns: ['dist/*'],
  rules: applyTsPluginExtendedRules({
    ...changedEslintRecommendedRules,
    ...possibleErrorsRules,
    ...bestPracticesRules,
    ...suggestionsRules,
    ...variablesRules,
    ...importRules,
    ...ES6Rules,
    ...tsRules,
  }),
};
