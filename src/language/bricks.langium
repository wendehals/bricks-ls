grammar Bricks

entry Model:
    commands+=Command*;

Command:
    Declaration | Assignment | Save | Export | Build | Pause;

Declaration:
    'var' name=ID;

Assignment:
    declaration=[Declaration:ID] ':=' collection=Exp;

Save:
    'save' '(' collection=Exp ',' file=STRING ')';

Export:
    'export' '(' collection=Exp ',' dir=STRING ')';

Build:
    'build' '(' targetCollection=Exp ',' sourceCollection=Exp ',' dir=STRING (',' buildMode=ID )? ')';

Pause:
    'pause' '(' seconds=INT ')';


Exp: 
    Identifier| Load | Import | AllParts | Lost | Set_ | UserSet | SetList | PartList | PartLists | Sum | Subtract | Max | Sort;

Identifier:
    declaration=[Declaration:ID];

Load:
    'load' '(' file=STRING ')';

Import:
    'import' '(' file=STRING ')';

interface AllParts {}

AllParts returns AllParts:
    {AllParts} 'allParts';

interface Lost {}

Lost returns Lost:
    {Lost} 'lost';

Set_:
    'set' '(' setNum=SET_NUM (',' includeMiniFigs=BOOL)? ')';

UserSet:
    'userSet' '(' setNum=SET_NUM (',' includeMiniFigs=BOOL)? ')';

SetList:
    'setList' '(' listId=INT (',' includeMiniFigs=BOOL)? ')';

PartList:
    'partList' '(' listId=INT ')';

PartLists:
    'partLists' '(' listsId=INT (',' includeNonBuildableParts=BOOL)? ')';

Sum:
    'sum' '(' summands+=Exp (',' summands+=Exp)+ ')';

Subtract:
    'subtract' '(' minuend=Exp ',' subtrahend=Exp ')';

Max:
    'max' '(' firstCollection=Exp (',' secondCollection=Exp)+ ')';

Sort:
    'sort' '(' collection=Exp (',' quantity='quantity')? (',' descending='descending')? ')';


terminal fragment DIGIT: /[0-9]/;
terminal ID: /[a-zA-Z][a-zA-Z0-9_]*/;
terminal BOOL: /'true'|'false'/;
terminal SET_NUM: DIGIT+'-'DIGIT;
terminal INT returns number: DIGIT+;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal WS: /\s+/;
