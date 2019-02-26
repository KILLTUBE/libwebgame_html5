
/*
    for (var i=0; i<32; i++) {
        var shifted = 1 << i;
        console.log("(1 << " + i + ") // 0x" + shifted.toString(16))
    }
    
    (1 << 0) // 0x1
    (1 << 1) // 0x2
    (1 << 2) // 0x4
    (1 << 3) // 0x8
    (1 << 4) // 0x10
    (1 << 5) // 0x20
    (1 << 6) // 0x40
    (1 << 7) // 0x80
    (1 << 8) // 0x100
    (1 << 9) // 0x200
    (1 << 10) // 0x400
    (1 << 11) // 0x800
    (1 << 12) // 0x1000
    (1 << 13) // 0x2000
    (1 << 14) // 0x4000
    (1 << 15) // 0x8000
    (1 << 16) // 0x10000
    (1 << 17) // 0x20000
    (1 << 18) // 0x40000
    (1 << 19) // 0x80000
    (1 << 20) // 0x100000
    (1 << 21) // 0x200000
    (1 << 22) // 0x400000
    (1 << 23) // 0x800000
    (1 << 24) // 0x1000000
    (1 << 25) // 0x2000000
    (1 << 26) // 0x4000000
    (1 << 27) // 0x8000000
    (1 << 28) // 0x10000000
    (1 << 29) // 0x20000000
    (1 << 30) // 0x40000000
    (1 << 31) // 0x-80000000
*/

CONTENTS_SOLID         = 1
CONTENTS_LAVA          = 8
CONTENTS_SLIME         = 16
CONTENTS_WATER         = 32
CONTENTS_FOG           = 64
CONTENTS_NOTTEAM1      = 0x0080
CONTENTS_NOTTEAM2      = 0x0100
CONTENTS_NOBOTCLIP     = 0x0200
CONTENTS_AREAPORTAL    = 0x8000
CONTENTS_PLAYERCLIP    = 0x10000
CONTENTS_MONSTERCLIP   = 0x20000
CONTENTS_TELEPORTER    = 0x40000
CONTENTS_JUMPPAD       = 0x80000
CONTENTS_CLUSTERPORTAL = 0x100000
CONTENTS_DONOTENTER    = 0x200000
CONTENTS_BOTCLIP       = 0x400000
CONTENTS_MOVER         = 0x800000
CONTENTS_ORIGIN        = 0x1000000
CONTENTS_BODY          = 0x2000000
CONTENTS_CORPSE        = 0x4000000
CONTENTS_DETAIL        = 0x8000000
CONTENTS_STRUCTURAL    = 0x10000000
CONTENTS_TRANSLUCENT   = 0x20000000
CONTENTS_TRIGGER       = 0x40000000
CONTENTS_NODROP        = 0x80000000

MASK_ALL               = -1;
MASK_SOLID             = CONTENTS_SOLID;
MASK_DEADSOLID         = CONTENTS_SOLID | CONTENTS_PLAYERCLIP;
MASK_PLAYERSOLID       = CONTENTS_SOLID | CONTENTS_PLAYERCLIP | CONTENTS_BODY;
MASK_WATER             = CONTENTS_WATER | CONTENTS_LAVA       | CONTENTS_SLIME;
MASK_OPAQUE            = CONTENTS_SOLID | CONTENTS_SLIME      | CONTENTS_LAVA;
MASK_SHOT              = CONTENTS_SOLID | CONTENTS_BODY       | CONTENTS_CORPSE;
