import { Rule, RuleGroup } from '../types/query';

const conditionSymbols: { [key: string]: string } = {
  'Equals': '==',
  'Does not equal': '!=',
  'Like': '~=',
  'Not like': '!~',
  'Is Empty': 'is empty',
  'Is': 'is',
  'Is not': 'is not'
};

export const ruleToString = (rule: Rule): string => {
  const { field, condition, criteria } = rule;
  return `(field.${field?.toLowerCase()}) ${conditionSymbols[condition || '']} "${criteria}"`;
};

export const groupToString = (group: RuleGroup): string => {
  const { children, conjunction, not } = group;
  const prefix = not ? 'NOT ' : '';
  const childStrings = children.map(child => child.type === 'rule' ? ruleToString(child as Rule) : groupToString(child as RuleGroup));
  return `${prefix}(${childStrings.join(` ${conjunction} `)})`;
};
