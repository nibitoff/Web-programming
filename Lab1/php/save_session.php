<?php
session_start();
if (isset($_SESSION['answers'])) {
    foreach ($_SESSION['answers'] as $result) { ?>
        <tr>
            <td><?php echo $result[0] ?></td>
            <td><?php echo $result[1] ?></td>
            <td><?php echo $result[2] ?></td>
            <td><?php echo $result[3] ?></td>
            <td><?php echo $result[5] ?></td>
            <td><?php echo $result[4] ?></td>
        </tr>
    <?php }} ?>